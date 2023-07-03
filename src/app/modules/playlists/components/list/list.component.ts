import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../../services/playlists.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from 'src/app/core/models/playlist.model';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.playlists$ = this.playlistsService.getPlayLIsts();
  }

  deleteByName(playlistName: string) {
    console.log({playlistName})
    this.playlistsService.deleteByName(playlistName).subscribe((_) => {
      this.playlists$ = this.playlistsService.getPlayLIsts()
      this.message.success('Playlist Successfully deleted')
    })
  }
  editPlaylist(playlist: PlaylistModel) {
    this.router.navigate(['dashboard', 'playlists', 'form', playlist.name])
  }

}
