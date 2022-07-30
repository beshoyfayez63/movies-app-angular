import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading = false;
  errorMessages: string[] = [];
  successMessage = '';
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get f() {
    return this.registerForm.controls;
  }

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  createUser() {
    this.successMessage = '';
    this.errorMessages = [];
    const { name, email, password } = this.registerForm.value;
    this.loading = true;
    this.authService.registerUser(name, email, password).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.successMessage = 'User Created Successfully';
        this.registerForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessages = err.error;
      },
    });
  }
}
