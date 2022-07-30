import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getUser().pipe(
      take(1),
      switchMap((user) => {
        let modifiedReq = req.clone({
          headers: req.headers
            .set('Authorization', `Bearer ${user?.token}`)
            .set('Accept', 'application/json'),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
