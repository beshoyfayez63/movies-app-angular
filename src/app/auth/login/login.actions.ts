import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

const LOGIN_START = '[Login Page] Login Start';
const LOGIN_SUCCESS = '[Login Page] Login Success';
const LOGIN_ERROR = '[Login Page] Login Error';

export const loginStart = createAction(LOGIN_START, props<{ email: string, password: string; }>());

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User, redirect: boolean; }>());

export  const loginError = createAction(LOGIN_ERROR, props<{ errorMsg: string; }>())
