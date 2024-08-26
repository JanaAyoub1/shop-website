// import { createReducer, on } from '@ngrx/store';
// import { login, loginSuccess, loginFailure } from './login.actions';

// export interface AuthState {
//   user: any;
//   error: string | null;
// }

// export const initialState: AuthState = {
//   user: null,
//   error: null,
// };

// export const authReducer = createReducer(
//   initialState,
//   on(login, (state) => ({ ...state, error: null })),
//   on(loginSuccess, (state, { user }) => ({ ...state, user })),
//   on(loginFailure, (state, { error }) => ({ ...state, error }))
// );
