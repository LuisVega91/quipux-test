import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../../services/playlists.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from 'src/app/core/models/playlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  playlists$!: Observable<PlaylistModel[]>;

  constructor(
    private playlistsService: PlaylistsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.playlists$ = this.playlistsService.getPlayLIsts();
    this.playlistsService.setSelectedPlaylist( new PlaylistModel({}))
  }

  deleteByName(playlistName: string) {
    console.log({playlistName})
    this.playlistsService.deleteByName(playlistName).subscribe((_) => {
      this.playlists$ = this.playlistsService.getPlayLIsts()
    })
  }
  editPlaylist(playlist: PlaylistModel) {
    console.log({playlist})
    this.playlistsService.setSelectedPlaylist(playlist);
    this.router.navigate(['dashboard', 'playlists', 'form'])
  }

}
