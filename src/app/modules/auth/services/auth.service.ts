import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, SessionData, SessionDataModel } from 'src/app/core/models/user.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from 'src/app/core/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.baseUrl}/auth`

  constructor(private http: HttpClient) { }

  singIn(body: Credentials): Observable<SessionData> {
    const url = `${this.authUrl}/login`
    return this.http.post<SessionData>(url, body)
  }
}
