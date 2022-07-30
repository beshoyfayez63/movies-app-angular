import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { environment } from './../../environments/environment';
import { User } from '../models/user';

export const STORAGE_KEY = 'userData';

interface UserData {
  _token: string;
  _expirationDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(null);

  private timer: any;
  constructor(private http: HttpClient, private router: Router) {}

  getUser() {
    return this.user$.asObservable();
  }

  registerUser(name: string, email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/register`, {
      name,
      email,
      password,
    });
  }
  loginUser(email: string, password: string) {
    return this.http
      .post(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.saveUserData(res.authorisation.token);
          // this.autoLogout(res.authorisation.token);
        })
      );
  }

  isAuth() {
    return !!localStorage.getItem(STORAGE_KEY);
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this.user$.next(null);
    this.router.navigateByUrl('/auth/login');
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  private saveUserData(token: string) {
    const tokenData: any = jwtDecode(token);
    const expirationDate = tokenData.exp * 1000;
    const user = new User(token, new Date(expirationDate));
    this.user$.next(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!userData) return;
    const loadedUser = new User(
      userData._token,
      new Date(userData._expirationDate)
    );
    const expirationDuration =
      new Date(userData._expirationDate).getTime() - new Date().getTime();
    // console.log(new Date(userData._expirationDate));

    if (loadedUser.token) {
      this.user$.next(loadedUser);
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
