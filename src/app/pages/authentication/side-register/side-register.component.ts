import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  registerForm!: FormGroup;
  isSubmitting = false;

  constructor(private settings: CoreService, private router: Router, private fb: FormBuilder,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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
        console.log('User registered successfully:', response);
        this.router.navigate(['/authentication/login']); // Redirect to login page after registration
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.isSubmitting = false;
      }
    });
  }

}
