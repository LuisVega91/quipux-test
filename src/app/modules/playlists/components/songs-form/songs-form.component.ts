import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from 'src/app/core/models/song.model';

@Component({
  selector: 'app-songs-form',
  templateUrl: './songs-form.component.html',
  styleUrls: ['./songs-form.component.scss']
})
export class SongsFormComponent implements OnInit {

  @Input() songs: SongModel[] = [];
  editCache: { [key: string]: { edit: boolean; data: SongModel } } = {};

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.songs.findIndex(song => song.id === id);
    this.editCache[id] = {
      data: { ...this.songs[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.songs.findIndex(item => item.id === id);
    Object.assign(this.songs[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.songs.forEach(song => {
      this.editCache[song.id] = {
        edit: false,
        data: { ...song }
      };
    });
  }

  ngOnInit(): void {
    this.updateEditCache();
  }

  addNewSong() {
    console.log({size_prev: this.songs.length});
    this.songs = this.songs.concat([new SongModel({})]);
    console.log({size_post: this.songs.length});
    this.updateEditCache()
  }
}