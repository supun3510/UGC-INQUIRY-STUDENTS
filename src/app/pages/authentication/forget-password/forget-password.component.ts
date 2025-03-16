import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../AuthService';
@Component({
  selector: 'app-forget-password',
  imports: [RouterModule, MaterialModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email: string = '';
  newPassword: string = '';
  code: number;
  isEmailStep: boolean = true; // Flag to toggle between the steps
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';  // This will hold the type of the toast (success, error, info)]
  /**
   *
   */
  constructor(private authService : AuthService , private route: Router ) {

  }


  onEmailSubmit(): void {

    var model ={
      username: this.email
    }

    this.authService.sendOTP(model).subscribe({
      next: (response) => {
        this.isEmailStep = false
        localStorage.setItem('userId',response.user_id)
        this.showToastMessage('Code sent successfully!','success');
      },
      error: (error) => {
        this.showToastMessage('Code sent failed!','error');
      }
    });
  }
  onPasswordSubmit() {
  const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }
    const model = {
      code: this.code.toString(),
      user_id: parseInt(userId),
      password: this.newPassword
    }

    this.authService.resetPassword(model).subscribe({
      next: (response) => {
        // this.isEmailStep = false
        this.route.navigate(['/authentication/login']); // Redirect to dashboard
        this.showToastMessage('Password reset successful!','success');
      },
      error: (error) => {
        this.showToastMessage('Password reset failed!','error');
      }
    });
  }

   // Method to show success toast
   showToastMessage(message: string , type: string) {
    this.toastMessage = message;
    this.showToast = true;
    this.toastType = type
    // Hide toast after 3 seconds
    setTimeout(() => {
      this.showToast = false;
      // this.onCancel();
    }, 5000);
  }
}
