import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../../services/playlists.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from 'src/app/core/models/playlist.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  playlists$!: Observable<PlaylistModel[]>;

  constructor(private playlistsService: PlaylistsService) {

  }

  ngOnInit(): void {
    this.playlists$ = this.playlistsService.getPlayLIsts();
  }

  deleteByName(playlistName: string) {
    console.log({playlistName})
    this.playlistsService.deleteByName(playlistName).subscribe((_) => {
      this.playlists$ = this.playlistsService.getPlayLIsts()
    })
  }
  editById(playlistId: number) {
    this.playlistsService.editById(playlistId)
  }

}
