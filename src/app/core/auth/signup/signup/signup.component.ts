import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { ISignupRequest } from '../model/signup-request.model';
import { ISignupResponse } from '../model/signup-response.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const request: ISignupRequest = this.signupForm.value;
      this.signupService.signUp(request).subscribe({
        next: (response: ISignupResponse) => {
          // Handle the successful sign-up response
          console.log('Sign-up successful:', response.Signup);
          // Redirect the user to the login page or perform any other necessary actions
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Handle the sign-up error
          console.error('Sign-up error:', error);
        },
      });
    }
  }
}
