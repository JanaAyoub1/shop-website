// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor() {}

//   isLoggedIn(): boolean {
//     // Here you check if the user is logged in by checking the presence of a token in localStorage/sessionStorage
//     return !!localStorage.getItem('authToken');
//   }

//   // You can add other methods related to authentication as needed
  
// }


// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment.dev';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = environment.authenticationAPI; 

//   constructor(private router: Router, private http: HttpClient) {}

//   logout(): void {
//     // Call server-side logout endpoint
//     this.http.post(`${this.apiUrl}User/Logout()`, {}).subscribe({
//       next: () => {
//         // Remove JWT or other authentication data from local storage
//         localStorage.removeItem('authToken');
//         // localStorage.removeItem('user');

//         // Redirect the user to the login page or home page
//         this.router.navigate(['/login']);
//       },
//       error: () => {
//         // Handle error if needed
//         localStorage.removeItem('authToken');
//         // localStorage.removeItem('user');
//         this.router.navigate(['/login']);
//       },
//     });
//   }

//   isLoggedIn(): boolean {
//     const token = localStorage.getItem('token');
//     return !!token;
//   }

//   decodeToken(): any {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Decode the token if needed
//     }
//     return null;
//   }
// }


// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment.dev';
// import { ILoginRequest } from '../auth/login/model/login-request.model';
// import { ILoginResponse } from '../auth/login/model/login-response.model';
// import { jwtDecode } from 'jwt-decode';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = environment.authenticationAPI;

//   constructor(private router: Router, private http: HttpClient) {}

//   // Login method that accepts login request and returns an observable
//   login(request: ILoginRequest): Observable<ILoginResponse> {
//     return this.http.post<ILoginResponse>(`${this.apiUrl}/User/Login`, request);
//   }

//   // Logout method to clear stored token and navigate to login
//   logout(): void {
//     this.http.post(`${this.apiUrl}/User/Logout()`, {}).subscribe({
//       next: () => {
//         // Clear authentication token from local storage
//         this.clearToken();
//         // Redirect to login page
//         this.router.navigate(['/login']);
//       },
//       error: () => {
//         this.clearToken();
//         this.router.navigate(['/login']);
//       },
//     });
//   }

//   // Check if the user is logged in by checking the presence of a token
//   isLoggedIn(): boolean {
//     const token = this.getToken();
//     return !!token;
//   }

//   // Decode the stored JWT token
//   decodeToken(): any {
//     const token = this.getToken();
//     if (token) {
//       return jwtDecode(token);
//     }
//     return null;
//   }

//   // Get token from local storage
//   private getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }

//   // Clear token from local storage
//   private clearToken(): void {
//     localStorage.removeItem('authToken');
//   }
// }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.authenticationAPI;
  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  private userInfo = new BehaviorSubject<any>(this.decodeToken());

  authStatus$ = this.authStatus.asObservable();
  userInfo$ = this.userInfo.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  login(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}User/Login()`, request).pipe(
      tap((response: any) => {
        // Save JWT token and update the auth state
        localStorage.setItem('authToken', response.Login.AccessToken);
        this.authStatus.next(true);
        this.userInfo.next(this.decodeToken());
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}User/Logout()`, {}).subscribe({
      next: () => {
        localStorage.removeItem('authToken');
        this.authStatus.next(false);
        this.userInfo.next(null);
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('authToken');
        this.authStatus.next(false);
        this.userInfo.next(null);
        this.router.navigate(['/login']);
      },
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  decodeToken(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode the token to get user info
      return jwtDecode(token);
    }
    return null;
  }
}
