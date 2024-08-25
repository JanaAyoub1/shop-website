import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Display a message to inform the user
      this.snackBar.open('You need to log in to access this page.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });

      // Redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
