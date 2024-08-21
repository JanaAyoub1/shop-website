// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { SignupService } from '../service/signup.service';
// import { ISignupRequest } from '../model/signup-request.model';
// import { ISignupResponse } from '../model/signup-response.model';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss'],
// })
// export class SignupComponent {
//   signupForm: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     private signupService: SignupService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {
//     this.signupForm = this.formBuilder.group({
//       firstName: ['', [Validators.required]],
//       lastName: ['', [Validators.required]],
//       Email: ['', [Validators.required, Validators.email]],
//       Password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       const request: ISignupRequest = this.signupForm.value;
//       this.signupService.signUp(request).subscribe({
//         next: (response: ISignupResponse) => {
//           // Handle the successful sign-up response
//           console.log('Sign-up successful:', response.Signup);

//           // Show a success message
//           this.snackBar.open('Sign-up successful! Please log in.', 'Close', {
//             duration: 3000,
//             verticalPosition: 'top',
//           });

//           // Redirect the user to the login page
//           this.router.navigate(['/login']);
//         },
//         error: (error) => {
//           // Handle the sign-up error
//           console.error('Sign-up error:', error);
//           this.snackBar.open('Sign-up failed. Please try again.', 'Close', {
//             duration: 3000,
//             verticalPosition: 'top',
//           });
//         },
//       });
//     } else {
//       this.snackBar.open(
//         'Please fill in all required fields correctly.',
//         'Close',
//         {
//           duration: 3000,
//           verticalPosition: 'top',
//         }
//       );
//     }
//   }
// }

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { ISignupRequest } from '../model/signup-request.model';
import { ISignupResponse } from '../model/signup-response.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  // standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  // imports: [
  //   CommonModule,
  //   ReactiveFormsModule,
  //   HttpClientModule,
  //   MatSnackBarModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatButtonModule,
  // ],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private snackBar: MatSnackBar
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

          // Show a success message
          this.snackBar.open('Sign-up successful! Please log in.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });

          // Redirect the user to the login page
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Handle the sign-up error
          console.error('Sign-up error:', error);
          this.snackBar.open('Sign-up failed. Please try again.', 'Close', {
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

