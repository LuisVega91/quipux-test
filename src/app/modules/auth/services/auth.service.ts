import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SingInRequestType,
  SingUpRequestType,
  SingUpResponseType,
  UserModel,
} from 'src/app/core/models/user.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthToken } from 'src/app/core/models/AuthToken.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  singIn(user: UserModel): Observable<AuthToken> {
    const body: SingInRequestType = user.toSingInRequestType();
    return this.http.post<AuthToken>(`${this.authUrl}/login`, body);
  }

  singUp(user: UserModel): Observable<AuthToken> {
    const body: SingUpRequestType = user.toSingUpRequestType();
    return this.http
      .post<SingUpResponseType>(`${this.authUrl}/register`, body)
      .pipe(map((response) => response.auth));
  }
}
