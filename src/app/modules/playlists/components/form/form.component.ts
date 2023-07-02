import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PlaylistsService } from '../../services/playlists.service';
import { PlaylistModel } from 'src/app/core/models/playlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  playlistForm!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    // songs: FormControl<string>;
  }>;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  playlist: PlaylistModel = new PlaylistModel({});
  isEditable: boolean = false;


  constructor(
    private fb: FormBuilder,
    private playlistsService: PlaylistsService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  formInit() {
    this.playlistForm = this.fb.group({
      name: new FormControl<string>(this.playlist.name, { validators: [Validators.required], nonNullable: true }),
      description: new FormControl<string>(this.playlist.description, { validators: [Validators.required], nonNullable: true }),
      // songs: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    });
    this.isEditable = !this.playlist.id;
  }

  getSelectedPlaylist(){
    this.playlist = this.playlistsService.getSelectedPlaylist()
  }

  ngOnInit(): void {
    this.getSelectedPlaylist();
    this.formInit();
  }

  save() {
    const id = this.message.loading('Saving in progress..', { nzDuration: 250 }).messageId;
    const playlistModel = new PlaylistModel(this.playlistForm.value);
    this.playlistsService.savePlaylist(playlistModel).subscribe((playlist) => {
      this.playlist = playlist;
      this.formInit();
      this.message.remove(id);
      this.message.success(`Playlist Saved Successfully`).onClose.subscribe(()=>{
        this.message.info('Now you can add new songs')
      });
      // this.router.navigate(['dashboard', 'playlists', 'list']);
    })
  }
}