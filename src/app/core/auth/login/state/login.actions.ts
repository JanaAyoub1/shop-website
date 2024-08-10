import { createAction, props } from '@ngrx/store';

// Action to initiate login
export const login = createAction(
  '[Auth] Login',
  props<{ Username: string; Password: string }>()
);

// Action dispatched when login is successful
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);

// Action dispatched when login fails
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
