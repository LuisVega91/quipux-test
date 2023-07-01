import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { playlistResponseAdapter, PlaylistSourceResponse } from 'src/app/core/model-adapters/playlists.adapter';
import { PlaylistModel, Playlists } from 'src/app/core/models/playlist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {


  private playlistUrl = `${environment.baseUrl}/lists`

  constructor(private http: HttpClient) {

  }

  getPlayLIsts(): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistSourceResponse>(`${this.playlistUrl}/`).pipe<Playlists, PlaylistModel[]>(
      map((playlistSourceResponse) => { return playlistResponseAdapter(playlistSourceResponse); }),
      map(({ lists }) => lists.map(playlist => new PlaylistModel(playlist)))
    );
  }

  editById(playlistId: number) {

  }
  deleteByName(playlistName: string) {
    return this.http.delete(`${this.playlistUrl}/${playlistName}`, )
  }
}
