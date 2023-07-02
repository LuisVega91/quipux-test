import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Song, SongBackendPostType, SongBackendType, SongModel } from 'src/app/core/models/song.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private songsUrl = `${environment.baseUrl}`

  constructor(private http: HttpClient) {

  }

  createSong(song: SongModel): Observable<SongModel> {
    const body: SongBackendPostType = song.toBakedTypeForPost()
    return this.http.post<Partial<SongBackendType>>(`${this.songsUrl}/`, body).pipe<SongModel>(
      map(({ id }) => new SongModel({ ...song, id }))
    );
  }

  deleteSong(songId: number): Observable<{ messsage: string }> {
    return this.http.delete<{ messsage: string }>(`${this.songsUrl}/${songId}`)
  }
}
