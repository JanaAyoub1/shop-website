// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { tap, catchError } from 'rxjs/operators';
// import { ILoginRequest } from '../models-login/Login-request.model';
// import { ILoginResponse } from '../models-login/login-response.model';
// import { environment } from '../environments/environment.dev';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
//   private apiUrl = environment.authenticationAPI;
//   private isLoggedIn = false;

//   constructor(private http: HttpClient) {}

//   login(request: ILoginRequest): Observable<ILoginResponse> {
//     return this.http.post<ILoginResponse>(
//       `${this.apiUrl}User/Login()`,
//       request
//     );
//   }
// }
//   return this.http.post<any>(url, { username, password }).pipe(
//     tap((response) => {
//       if (response.success) {
//         this.isLoggedIn = true;
//         // Save token or other necessary info in local storage/session storage
//         localStorage.setItem('token', response.token);
//       }
//     }),
//     catchError(this.handleError<any>('login'))
//   );
// }

// logout(): void {
//   this.isLoggedIn = false;
//   localStorage.removeItem('token');
// }

// isAuthenticated(): boolean {
//   // Optionally, check if token is still valid
//   return this.isLoggedIn || !!localStorage.getItem('token');
// }

// private handleError<T>(operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {
//     console.error(error); // log to console
//     return of(result as T);
//   };
// }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
//   private apiUrl = 'http://173.249.40.235:5005/api/User'; // Replace with your API endpoint

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<any> {
//     return this.http
//       .post<any>(`${this.apiUrl}/login`, { email, password })
//       .pipe(
//         map((response) => {
//           // Handle the response, e.g., store token
//           if (response && response.token) {
//             localStorage.setItem(
//               'currentUser',
//               JSON.stringify({ email, token: response.token })
//             );
//           }
//           return response;
//         })
//       );
//   }

//   logout(): void {
//     // Remove user from local storage to log out the user
//     localStorage.removeItem('currentUser');
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../models-login/login-request.model';
import { ILoginResponse } from '../models-login/login-response.model';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.authenticationAPI;

  constructor(private http: HttpClient) {}

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.apiUrl}User/Login()`,
      request,
    );
  }
}
