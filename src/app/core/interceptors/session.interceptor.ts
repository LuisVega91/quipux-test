import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.sessionService.currentSession.token;
    if (!token) { this.router.navigate(['']) }
    const authenticatedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(authenticatedRequest);
  }
}
