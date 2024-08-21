// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginService } from '../service/login.service';
// import { ILoginRequest } from '../model/login-request.model';
// import { ILoginResponse } from '../model/login-response.model';
// import { HttpClientModule } from '@angular/common/http';
// import { jwtDecode } from 'jwt-decode';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })

// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private loginService: LoginService,
//     private router: Router
//   ) {
//     this.loginForm = this.formBuilder.group({
//       Username: ['', [Validators.required, Validators.email]],
//       Password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const request: ILoginRequest = this.loginForm.value;
//       this.loginService.login(request).subscribe({
//         next: (response: ILoginResponse) => {
//           // Handle the successful login response
//           console.log(
//             'Login successful:',
//             jwtDecode(response.Login.AccessToken)
//           );
//         },
//         error: (error) => {
//           // Handle the login error
//           // invalid username or password
//           console.error('Login error:', error);
//         },
//       });
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ILoginRequest } from '../model/login-request.model';
import { ILoginResponse } from '../model/login-response.model';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
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
          // Decode the JWT token
          const decodedToken = jwtDecode(response.Login.AccessToken);
          console.log('Login successful:', decodedToken);

          // Save the token in localStorage
          localStorage.setItem('authToken', response.Login.AccessToken);

          // Show a success message
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });

          // Redirect to the desired page after successful login
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // Handle the login error
          console.error('Login error:', error);
          this.snackBar.open('Invalid username or password.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        },
      });
    } else {
      this.snackBar.open(
        'Please fill in all required fields correctly.',
        'Close',
        {
          duration: 3000,
          verticalPosition: 'top',
        }
      );
    }
  }
}

