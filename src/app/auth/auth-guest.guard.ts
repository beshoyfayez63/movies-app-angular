import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Store } from "@ngrx/store";
import { user } from "./store/auth.reducer";

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanLoad {
  constructor(private store: Store, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.store.select(user).pipe(
      take(1),
      map((user) => {
        if(user) {
            this.router.navigateByUrl('/movies');
            return false;
        } else {
            return true;
        }
      })
    );
  }
}
