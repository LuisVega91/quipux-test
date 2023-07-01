import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionData, SessionDataModel } from '../models/user.model';
import { LOCAL_STORAGE_SESSION_KEY } from '../constants/session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  currentSession: SessionDataModel = new SessionDataModel({});
  private currentSession$: BehaviorSubject<SessionDataModel> = new BehaviorSubject(this.currentSession)

  constructor(private router: Router) {
    const sessionInLocalStorage = this.getSessionFromLocalStorage()
    this.setCurrentSession(sessionInLocalStorage)
  }

  gerCurrentSession(): Observable<SessionDataModel> {
    if (!this.currentSession.token) {
      this.router.navigate(['/'])
    }
    return this.currentSession$.asObservable();
  }

  setCurrentSession(newSession: SessionData) {
    this.currentSession = new SessionDataModel(newSession)
    this.setSessionToLocalStorage(newSession)
    this.currentSession$.next(this.currentSession)
  }
  
  cleanCurrentSession(){
    this.setSessionToLocalStorage({})
    this.currentSession = new SessionDataModel({})
    this.currentSession$.next(this.currentSession);
  }

  private getSessionFromLocalStorage(): SessionData {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) ?? '{}'
    )
  }

  private setSessionToLocalStorage(newSession: Partial<SessionData>) {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY,
      JSON.stringify(newSession)
    )
  }

}
