import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from './service/signup.service';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, ReactiveFormsModule, SignupRoutingModule],
  providers: [SignupService],
})
export class SignupModule {}
