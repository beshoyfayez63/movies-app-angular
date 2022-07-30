import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  errorMessage: string = '';
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.loading = true;
    this.authService.loginUser(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigateByUrl('/movies', { replaceUrl: true });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);

        this.loading = false;
        this.errorMessage = err.error.message;
      },
    });
  }
}
