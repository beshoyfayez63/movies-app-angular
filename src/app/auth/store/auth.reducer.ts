import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { loginError, loginStart, loginSuccess } from "../login/login.actions";
import { User } from "../../models/user";
import { logout } from "../../app.actions";
import { registerFail, registerStart, registerSuccess } from "../register/register.actions";

export interface AuthState {
  loading: boolean;
  user: User;
  errorMsg: string | string[];
  successMsg: string
}

const authState: AuthState = {
  loading: false,
  user: null,
  errorMsg: '',
  successMsg: '',
}

export const authReducer = createReducer(authState,
    on(loginStart, (state) => ({
      ...state,
      loading: true,
      user: null,
    })),

    on(loginSuccess, (state, action) => ({
      ...state,
      loading: false,
      user: action.user,
      errorMsg: '',
    })),

    on(loginError, (state, action) => ({
      ...state,
      loading: false,
      errorMsg: action.errorMsg,
      user: null
    })),

    on(registerStart, (state, action) => ({
      ...state,
      loading: true,
      errorMsg: '',
      user: null
    })),
    on(registerSuccess, (state, action) => ({
      ...state,
      loading: false,
      successMsg: 'User Created Successfully',
    })),
    on(registerFail, (state, action) => ({
      ...state,
      successMsg: '',
      loading: false,
      errorMsg: action.errorMsg,
    })),
    on(logout, (state) => ({
      ...state,
      user: null
    }))
  )

const AUTH_STATE = 'auth';

const authFeature = createFeatureSelector<AuthState>(AUTH_STATE);
export const loading = createSelector(authFeature, (state) => state.loading);
export const errorMsg = createSelector(authFeature, (state) => state.errorMsg);
export const successMsg = createSelector(authFeature, (state) => state.successMsg);
export const token = createSelector(authFeature, (state) => state.user.token);
export const user = createSelector(authFeature, (state) => state.user);

