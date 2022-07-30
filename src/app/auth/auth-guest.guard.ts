import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.authService.getUser().pipe(
      take(1),
      map((user) => {
        if (this.authService.isAuth()) {
          this.router.navigateByUrl('/movies');
          return false;
        } else {
          // this.router.navigateByUrl('/auth/login');
          return true;
        }
      })
    );
  }
}
