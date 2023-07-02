import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PlaylistsService } from '../../services/playlists.service';
import { PlaylistModel } from 'src/app/core/models/playlist.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  playlistForm!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  playlist: PlaylistModel = new PlaylistModel({});
  isFormDisabled: boolean = false;
  canLoadFrom: boolean = false; 


  constructor(
    private fb: FormBuilder,
    private playlistsService: PlaylistsService,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) { }

  formInit() {
    this.playlistForm = this.fb.group({
      name: new FormControl<string>(this.playlist.name, { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>(this.playlist.description, { validators: [Validators.required], nonNullable: true })
    });
    this.canLoadFrom = true;
    this.isFormDisabled = !!this.playlist.id;
    if(this.isFormDisabled){
      this.playlistForm.disable();
    }
  }

  getPlaylistByName(playlistName: string) {
    this.playlistsService.getPlaylistByName(playlistName).subscribe(playlist => {
      this.playlist = playlist;
      this.formInit();
    })
  }

  ngOnInit() {
    const playlistName = this.route.snapshot.paramMap.get('playlistName');
    if (playlistName) {
      this.getPlaylistByName(playlistName);
      return;
    }
    this.formInit();
  }

  save() {
    const id = this.message.loading('Saving in progress..', { nzDuration: 250 }).messageId;
    const playlistModel = new PlaylistModel(this.playlistForm.value);
    this.playlistsService.savePlaylist(playlistModel).subscribe((playlist) => {
      this.playlist = playlist;
      this.formInit();
      this.message.remove(id);
      this.message.success(`Playlist Saved Successfully`).onClose.subscribe(() => {
        this.message.info('Now you can add new songs')
      });
    })
  }
}