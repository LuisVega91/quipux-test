import { TestBed } from '@angular/core/testing';

import { AuthenticatedGuard } from './authenticated.guard';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';
import { AuthTokenModel } from '../models/AuthToken.model';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let sessionService: jasmine.SpyObj<SessionService>;
  let messageService: jasmine.SpyObj<NzMessageService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    sessionService = jasmine.createSpyObj('SessionService', ['gerCurrentSession']);
    messageService = jasmine.createSpyObj('NzMessageService', ['warning']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    guard = new AuthenticatedGuard(
      sessionService,
      messageService,
      router
    );
  });

  it('should create the guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is authenticated', (done) => {
    sessionService.gerCurrentSession.and.returnValue(of({ hasToken: true, isTokenExpiated: false } as AuthTokenModel));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      expect(sessionService.gerCurrentSession).toHaveBeenCalled();
      expect(messageService.warning).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login page if user is not authenticated', (done) => {
    sessionService.gerCurrentSession.and.returnValue(of({ hasToken: false, isTokenExpiated: false } as AuthTokenModel));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(sessionService.gerCurrentSession).toHaveBeenCalled();
      expect(messageService.warning).toHaveBeenCalledOnceWith('Please Sing In!');
      expect(router.navigate).toHaveBeenCalledOnceWith(['/auth']);
      done();
    });
  });

  it('should redirect to login page if token is expired', (done) => {
    sessionService.gerCurrentSession.and.returnValue(of({ hasToken: true, isTokenExpiated: true } as AuthTokenModel));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(sessionService.gerCurrentSession).toHaveBeenCalled();
      expect(messageService.warning).toHaveBeenCalledOnceWith('Please Sing In!');
      expect(router.navigate).toHaveBeenCalledOnceWith(['/auth']);
      done();
    });
  });
});
