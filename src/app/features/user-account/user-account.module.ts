import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAccountRoutingModule } from './user-account-routing.module';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    ReactiveFormsModule, // Import ReactiveFormsModule for forms handling
    MatFormFieldModule, // Angular Material Form Field
    MatInputModule, // Angular Material Input
    MatButtonModule, // Angular Material Buttons
    MatSnackBarModule, // Angular Material Snack Bar for notifications
  ],
})
export class UserAccountModule {}
