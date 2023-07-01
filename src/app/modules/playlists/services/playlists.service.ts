import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { Playlist, PlaylistBackendCollectionType, PlaylistBackendType, PlaylistForCreationType, PlaylistModel } from 'src/app/core/models/playlist.model';
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

  getPlaylistById(id: number) {
    return this.http.get<PlaylistBackendCollectionType>(`${this.playlistUrl}/`).pipe<PlaylistModel[], PlaylistModel | undefined>(
      map((playlistsResponse) => PlaylistModel.fromBackendTypeCollection(playlistsResponse)),
      map((playlistsResponse) => playlistsResponse.find(playlist => playlist.id === id))
    );
  }

  editById(playlistId: number) {

  }

  deleteByName(playlistName: string) {
    return this.http.delete(`${this.playlistUrl}/${playlistName}`,)
  }

  createPlaylist(playlist: PlaylistModel): Observable<PlaylistModel> {
    const body: PlaylistForCreationType = playlist.toBakedTypeForPost();
    return this.http.post<PlaylistBackendType>(`${this.playlistUrl}/`, body)
      .pipe(map(response => PlaylistModel.fromBackendType(response)))
  }
}
