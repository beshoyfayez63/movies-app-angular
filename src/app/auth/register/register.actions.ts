import { createAction, props } from "@ngrx/store";

const REGISTER_START = '[Register Page] Register Start'
const REGISTER_SUCCESS = '[Register Page] Register Success'
const REGISTER_FAIL = '[Register Page] Register Fail'

export const registerStart = createAction(REGISTER_START, props<{name: string; email: string, password: string}>());
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFail = createAction(REGISTER_FAIL, props<{ errorMsg: string;}>());
