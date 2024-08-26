// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AuthState } from './login.reducers';

// // Create a feature selector for the auth state
// export const selectAuthState = createFeatureSelector<AuthState>('auth');

// // Selector to get the user from the auth state
// export const selectUser = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.user
// );

// // Selector to get the authentication error from the auth state
// export const selectAuthError = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.error
// );

// // Selector to check if the user is authenticated
// export const selectIsAuthenticated = createSelector(
//   selectUser,
//   (user) => !!user
// );
