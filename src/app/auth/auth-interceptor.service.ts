import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from "@ngrx/store";
import { user } from "./store/auth.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(user).pipe(
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
