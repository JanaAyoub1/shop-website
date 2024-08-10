import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignupRequest } from '../model/signup-request.model';
import { ISignupResponse } from '../model/signup-response.model';
import { environment } from '../../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = environment.authenticationAPI;

  constructor(private http: HttpClient) {}

  signUp(request: ISignupRequest): Observable<ISignupResponse> {
    return this.http.post<ISignupResponse>(
      `${this.apiUrl}User/SignUp()`,
      request
    );
  }
}
