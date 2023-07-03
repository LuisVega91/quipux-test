import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { Playlist, PlaylistGetResponseType, PlaylistPostResponseType, PlaylistPostRequestType, PlaylistModel } from 'src/app/core/models/playlist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  private playlistUrl = `${environment.baseUrl}/lists`

  constructor(private http: HttpClient) {

  }

  getPlayLIsts(): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistGetResponseType>(`${this.playlistUrl}/`).pipe<PlaylistModel[]>(
      map((playlistsResponse) => PlaylistModel.fromPlaylistGetResponseType(playlistsResponse))
    );
  }

  getPlaylistByName(playlistName: string): Observable<PlaylistModel> {
    return this.http.get<PlaylistPostResponseType>(`${this.playlistUrl}/${playlistName}`).pipe<PlaylistModel>(
      map((playlistsResponse) => PlaylistModel.fromPlaylistPostResponseType(playlistsResponse))
    );
  }

  deleteByName(playlistName: string) {
    return this.http.delete(`${this.playlistUrl}/${playlistName}`,)
  }

  savePlaylist(playlist: PlaylistModel): Observable<PlaylistModel> {
    const body: PlaylistPostRequestType = playlist.toPostRequestType();
    return this.http.post<PlaylistPostResponseType>(`${this.playlistUrl}/`, body)
      .pipe(map(response => PlaylistModel.fromPlaylistPostResponseType(response)))
  }

  
}
