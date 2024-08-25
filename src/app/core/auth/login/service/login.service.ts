import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../model/login-request.model';
import { ILoginResponse } from '../model/login-response.model';
import { environment } from '../../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.authenticationAPI;

  constructor(private http: HttpClient) {}

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.apiUrl}User/Login()`,
      request
    );
  }

}