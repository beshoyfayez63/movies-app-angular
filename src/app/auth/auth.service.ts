import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { User } from '../models/user';
import { Store } from "@ngrx/store";
import { logout } from "../app.actions";

export const STORAGE_KEY = 'userData';

export interface UserData {
  _token: string;
  _expirationDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private timer: any;
  constructor(private http: HttpClient, private store: Store) {}

  saveUserData(token: string) {
    const tokenData: any = jwtDecode(token);
    const expirationDate = tokenData.exp * 1000;
    const user = new User(token, new Date(expirationDate));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.setLogoutTimer(expirationDate);
    return user;
  }

  setLogoutTimer(expirationDuration: number) {
    this.timer = setTimeout(() => {
      this.store.dispatch(logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (!this.timer) return;
    clearTimeout(this.timer);
  }

}
