import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from 'src/app/core/models/song.model';
import { PlaylistsService } from '../../services/playlists.service';
import { SongsService } from '../../services/songs.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { YEAR_PATTERN } from 'src/app/core/constants/patterns';

@Component({
  selector: 'app-songs-form',
  templateUrl: './songs-form.component.html',
  styleUrls: ['./songs-form.component.scss']
})
export class SongsFormComponent implements OnInit {

  @Input() songs: SongModel[] = [];
  @Input() playlistId: number = 0;

  songForm!: FormGroup<{
    title: FormControl<string>;
    artist: FormControl<string>;
    album: FormControl<string>;
    year: FormControl<string>;
    genre: FormControl<string>;
  }>;
  canLoadFrom: boolean = false;
  isFormDisabled: boolean = false;
  newSong: SongModel = new SongModel({});

  deleteSong(songId: number) {
    this.songsService.deleteSong(songId).subscribe(() => {
      this.songs = this.songs.filter(song => song.id != songId)
    })
  }

  save() {
    const newSong = new SongModel({...this.songForm.value, playlistId: this.playlistId})
    this.songsService.createSong(newSong).subscribe((song) => {
      this.message.success('Song created Successfully ')
      this.songs = [
        song,
        ...this.songs
      ]
    })
  }

  formInit() {
    this.songForm = this.fb.group({
      title: new FormControl<string>(this.newSong.title, { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
      artist: new FormControl<string>(this.newSong.artist, { validators: [Validators.required], nonNullable: true }),
      album: new FormControl<string>(this.newSong.album, { validators: [Validators.required], nonNullable: true }),
      year: new FormControl<string>(this.newSong.year, { validators: [Validators.required, Validators.pattern(YEAR_PATTERN)], nonNullable: true }),
      genre: new FormControl<string>(this.newSong.genre, { validators: [Validators.required], nonNullable: true }),      
    });
    this.canLoadFrom = true;
    this.isFormDisabled = !!this.newSong.id;
    if(this.isFormDisabled){
      this.songForm.disable();
    }
  }


  constructor(
    private songsService: SongsService,
    private message: NzMessageService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.formInit();
  }

}