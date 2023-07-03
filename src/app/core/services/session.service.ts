import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOCAL_STORAGE_SESSION_KEY } from '../constants/constants';
import { Router } from '@angular/router';
import { AuthToken, AuthTokenModel } from '../models/AuthToken.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentSession: AuthTokenModel = new AuthTokenModel({});
  private currentSession$: BehaviorSubject<AuthTokenModel> = new BehaviorSubject(this.currentSession)

  constructor(private router: Router) {
    const sessionInLocalStorage = this.getSessionFromLocalStorage()
    this.setCurrentSession(sessionInLocalStorage)
  }

  gerCurrentSession(): Observable<AuthTokenModel> {
    if (!this.currentSession.hasToken) {
      this.router.navigate(['/'])
    }
    return this.currentSession$.asObservable();
  }

  setCurrentSession(newSession: AuthToken) {
    this.currentSession = new AuthTokenModel(newSession)
    this.setSessionToLocalStorage(newSession)
    this.currentSession$.next(this.currentSession)
  }
  
  cleanCurrentSession(){
    this.setSessionToLocalStorage({})
    this.currentSession = new AuthTokenModel({})
    this.currentSession$.next(this.currentSession);
  }

  private getSessionFromLocalStorage(): AuthToken {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) ?? '{}'
    )
  }

  private setSessionToLocalStorage(newSession: Partial<AuthToken>) {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY,
      JSON.stringify(newSession)
    )
  }
}
