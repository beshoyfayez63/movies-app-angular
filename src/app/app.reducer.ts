import { authReducer, AuthState } from "./auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";


export interface AppState {
  auth: AuthState,
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
}


