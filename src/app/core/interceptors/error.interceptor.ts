import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SessionService } from '../services/session.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private sessionService: SessionService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          this.sessionService.cleanCurrentSession();
          this.message.warning('Please Sing In!')
          return throwError(() => error);
        }
        if (error.status >= HttpStatusCode.InternalServerError) {
          this.message.error('Internal Server Error');
          return throwError(() => error);
        }
        if (error.status >= HttpStatusCode.BadRequest) {
          this.message.warning('Bad Request');
          return throwError(() => error);
        }

        this.message.warning(error.message);
        return throwError(() => error);
      })
    );
  }
}
