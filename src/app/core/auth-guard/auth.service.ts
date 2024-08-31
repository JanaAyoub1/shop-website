import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import {jwtDecode} from 'jwt-decode'; // Correct import
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
    return this.http.post<any>(`${this.apiUrl}User/Login()`, request).pipe(
      tap((response) => {
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
        localStorage.removeItem('user');
        this.authStatus.next(false);
        this.userInfo.next(null);
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
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
      try {
        return jwtDecode(token);
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
    return null;
  }

  // Method to update user information
  updateUserInfo(updatedUser: any): void {
    // Update the user data in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Emit the updated user info to the BehaviorSubject
    this.userInfo.next(updatedUser);
  }
}
