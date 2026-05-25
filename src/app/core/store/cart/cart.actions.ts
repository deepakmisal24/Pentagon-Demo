import { createAction, props } from '@ngrx/store';


// LOGIN ACTIONS

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);


// REGISTER ACTIONS

export const register = createAction(
  '[Auth] Register',
  props<{ payload: { email: string; password: string } }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: any; token: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);


// LOGOUT ACTION

export const logout = createAction(
  '[Auth] Logout'
);