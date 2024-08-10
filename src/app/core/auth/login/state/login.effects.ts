// // import { Injectable } from '@angular/core';
// // import { Actions, createEffect, ofType } from '@ngrx/effects';
// // import { catchError, map, mergeMap } from 'rxjs/operators';
// // import { of } from 'rxjs';
// // import { LoginService } from '../services/login.service';
// // import { login, loginSuccess, loginFailure } from './login.actions';

// // @Injectable()
// // export class AuthEffects {
// //   login$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(login),
// //       mergeMap((action) =>
// //         this.authService.login(action.username, action.password).pipe(
// //           map((user) => loginSuccess({ user })),
// //           catchError((error) => of(loginFailure({ error: 'Login failed' })))
// //         )
// //       )
// //     )
// //   );

// //   constructor(private actions$: Actions, private authService: LoginService) {}
// // }

// // auth.effects.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { LoginService } from '../services/login.service'; // Your authentication service
// import { login, loginSuccess, loginFailure } from './login.actions';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import { of } from 'rxjs';

// @Injectable()
// export class AuthEffects {
//   constructor(
//     private actions$: Actions,
//     private authService: LoginService
//   ) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(login),
//       switchMap(({ Username, Password }) =>
//         this.authService.login(Username, Password).pipe(
//           map((user) => loginSuccess({ user })),
//           catchError((error) => of(loginFailure({ error: error.message })))
//         )
//       )
//     )
//   );
// }

// auth.effects.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { LoginService } from '../services/login.service';
// import { login, loginSuccess, loginFailure } from './login.actions';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { ILoginResponse } from '../models-login/login-response.model';

// @Injectable()
// export class AuthEffects {
//   constructor(private actions$: Actions, private authService: LoginService) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(login),
//       switchMap(({ Username, Password }) =>
//         this.authService.login({ Username, Password }).pipe(
//           map((response: ILoginResponse) => {
//             if (response && response.Login && response.Login.AccessToken) {
//               return loginSuccess({ user: response }); // Replace 'user' with the actual user data if available
//             } else {
//               return loginFailure({ error: 'Invalid login credentials' });
//             }
//           }),
//           catchError((error) => of(loginFailure({ error: error.message })))
//         )
//       )
//     )
//   );
// }
