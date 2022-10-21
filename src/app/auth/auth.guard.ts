import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Store } from "@ngrx/store";
import { user } from "./store/auth.reducer";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(private store: Store,private router: Router) {}
  canLoad(_: Route, __: UrlSegment[]): boolean | Observable<boolean> {
    return this.store.select(user).pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          this.router.navigateByUrl('/auth/login');
          return false;
        }
      })
    );
  }
}
