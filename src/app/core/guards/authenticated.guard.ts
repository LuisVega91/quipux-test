import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { SessionService } from '../services/session.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard {
  constructor(
    private sessionService: SessionService,
    private message: NzMessageService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.sessionService.gerCurrentSession().pipe(
      map((authToken) => {
        if (authToken.isTokenExpiated) {return false;}
        return authToken.hasToken;
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.message.warning('Please Sing In!');
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
