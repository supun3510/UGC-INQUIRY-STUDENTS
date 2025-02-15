import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';  // This will hold the type of the toast (success, error, info)]

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false] // For "Remember this Device" checkbox
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.showToastMessage('Login Successful!','success');
        console.log('Login successful:', response);
        localStorage.setItem('userId',response.user_attributes.id)
        localStorage.setItem('token', response.token); // Store token
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      error: (error) => {
        this.showToastMessage('Login failed!','error');
        console.error('Login failed!', error);
        this.errorMessage = error.error.status;
        this.isSubmitting = false;
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

    // Method to return the appropriate class based on toast type
    getToastClass() {
      switch (this.toastType) {
        case 'success':
          return 'bg-success'; // Green color for success
        case 'error':
          return 'bg-danger';  // Red color for error
        case 'info':
          return 'bg-info';    // Blue color for info
        default:
          return 'bg-primary'; // Default to blue if no type is set
      }
    }

   // Method to close toast manually
closeToast() {
  this.showToast = false;
}
}