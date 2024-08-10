import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ILoginRequest } from './models-login/login-request.model';
import { ILoginResponse } from './models-login/login-response.model';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const request: ILoginRequest = this.loginForm.value;
      this.loginService.login(request).subscribe({
        next: (response: ILoginResponse) => {
          // Handle the successful login response
          console.log(
            'Login successful:',
            jwtDecode(response.Login.AccessToken)
          );
        },
        error: (error) => {
          // Handle the login error
          // invalid username or password
          console.error('Login error:', error);
        },
      });
    }
  }
}
