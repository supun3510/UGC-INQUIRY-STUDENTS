import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  registerForm!: FormGroup;
  isSubmitting = false;

  errorMessage: string = '';

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';  // This will hold the type of the toast (success, error, info)]

  constructor(private settings: CoreService, private router: Router, private fb: FormBuilder,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.showToastMessage('Registration Successful!','success');
        this.router.navigate(['/authentication/login']); // Redirect to login page after registration
      },
      error: (error) => {
        this.showToastMessage('Registration failed!','error');
        console.error('Registration failed:', error);
        this.errorMessage = error.error.error;
        this.isSubmitting = false;
      }
    });
  }
  onCancel(): void {
    this.router.navigate(['/authentication/login']);
  }
  closeToast(){

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
