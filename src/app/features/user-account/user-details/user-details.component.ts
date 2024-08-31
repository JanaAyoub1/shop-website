import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/auth-guard/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: any; // User information fetched from localStorage or AuthService
  isEditMode: boolean = false;
  editProfileForm!: FormGroup;
  initialUserData: any; // To store the initial user data for comparison

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load user data from AuthService or localStorage
    this.authService.userInfo$.subscribe((userInfo) => {
      this.user = userInfo || JSON.parse(localStorage.getItem('user') || '{}');
      this.initialUserData = { ...this.user }; // Save initial user data

      // Initialize the form with current user data
      this.editProfileForm = this.formBuilder.group({
        given_name: [this.user?.given_name || '', Validators.required],
        family_name: [this.user?.family_name || '', Validators.required],
        email: [
          this.user?.email || '',
          [Validators.required, Validators.email],
        ],
      });
    });
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
      // Check if there are unsaved changes
      if (
        JSON.stringify(this.initialUserData) !==
        JSON.stringify(this.editProfileForm.value)
      ) {
        // User has unsaved changes
        const discard = confirm(
          'You have unsaved changes. Are you sure you want to cancel?'
        );
        if (discard) {
          // Restore the initial user data
          this.editProfileForm.patchValue(this.initialUserData);
          this.isEditMode = false;
        }
      } else {
        // No unsaved changes
        this.isEditMode = false;
      }
    } else {
      // Enter edit mode and save current form values as initial
      this.initialUserData = { ...this.editProfileForm.value };
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      // Compare current form values with initial user data
      const hasChanges =
        JSON.stringify(this.initialUserData) !==
        JSON.stringify(this.editProfileForm.value);

      if (hasChanges) {
        // Update the user object with form values
        this.user = { ...this.user, ...this.editProfileForm.value };

        // Save the updated user object back to AuthService
        this.authService.updateUserInfo(this.user);

        // Save the updated user object to localStorage
        localStorage.setItem('user', JSON.stringify(this.user));

        // Show a success message
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      } else {
        // No changes detected
        this.snackBar.open('No changes were made!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }

      // Exit edit mode
      this.isEditMode = false;
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

  logout() {
    this.authService.logout();
  }
}
