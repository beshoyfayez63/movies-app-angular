import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";
import { loginError, loginStart, loginSuccess } from "../login/login.actions";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { AuthService, STORAGE_KEY, UserData } from "../auth.service";
import { autoLogin, logout } from "../../app.actions";
import { User } from "../../models/user";
import { registerFail, registerStart, registerSuccess } from "../register/register.actions";

@Injectable()
export class AuthEffects {
  constructor(private  actions$: Actions,
              private  http: HttpClient,
              private  router: Router,
              private authService: AuthService) {
  }
  authSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginStart),
    switchMap(authData => {
      return this.http
        .post(`${ environment.apiUrl }/login`, {
          email: authData.email,
          password: authData.password,
        }).pipe(
          map((resData: any) => {
            const token: string = resData.authorisation.token
            const user = this.authService.saveUserData(token);
            return loginSuccess({ user, redirect: true });
          }),
          catchError(err => {
            return of(loginError({ errorMsg: err.error.message }));
        }));
    }),
  ))

  authRegister = createEffect(() => this.actions$.pipe(
    ofType(registerStart),
    switchMap((registerStartAction) => {
      return this.http.post(`${environment.apiUrl}/register`, {
        name: registerStartAction.name,
        email:  registerStartAction.email,
        password: registerStartAction.password,
      }).pipe(
        map(() => {
          return registerSuccess();
        }),
        catchError(err => {
          console.log(err)
          return of(registerFail({errorMsg: err.error }));
        })
      )
    })
  ))

  authRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(async (userLoginAction) => {
      if(userLoginAction.redirect) {
        await this.router.navigateByUrl('/movies', { replaceUrl: true });
      }
    }),
  ), { dispatch: false })

  // @ts-ignore
  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(autoLogin),
    map(() => {
      const userData: UserData = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!userData) return { type: 'DUMMY' };
      const loadedUser = new User(
        userData._token,
        new Date(userData._expirationDate)
      );
      const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.authService.setLogoutTimer(expirationDuration);
      if (loadedUser.token) {
        return loginSuccess({ user: loadedUser, redirect: false });
      } else {
        return  { type: 'DUMMY' }
      }
    }),
  ))

  authLogout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(async () => {
      localStorage.removeItem(STORAGE_KEY);
      this.authService.clearLogoutTimer();
      await this.router.navigateByUrl('/auth/login');
    })
  ), {dispatch: false})
}
