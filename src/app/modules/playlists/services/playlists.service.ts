import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { Playlist, PlaylistBackendCollectionType, PlaylistBackendType, PlaylistBackendPostType, PlaylistModel } from 'src/app/core/models/playlist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  private playlistUrl = `${environment.baseUrl}/lists`

  constructor(private http: HttpClient) {

  }

  getPlayLIsts(): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistBackendCollectionType>(`${this.playlistUrl}/`).pipe<PlaylistModel[]>(
      map((playlistsResponse) => PlaylistModel.fromBackendTypeCollection(playlistsResponse))
    );
  }

  getPlaylistByName(playlistName: string): Observable<PlaylistModel> {
    return this.http.get<PlaylistBackendType>(`${this.playlistUrl}/${playlistName}`).pipe<PlaylistModel>(
      map((playlistsResponse) => PlaylistModel.fromBackendType(playlistsResponse))
    );
  }

  deleteByName(playlistName: string) {
    return this.http.delete(`${this.playlistUrl}/${playlistName}`,)
  }

  savePlaylist(playlist: PlaylistModel): Observable<PlaylistModel> {
    const body: PlaylistBackendPostType = playlist.toBakedPostType();
    return this.http.post<PlaylistBackendType>(`${this.playlistUrl}/`, body)
      .pipe(map(response => PlaylistModel.fromBackendType(response)))
  }

  
}
