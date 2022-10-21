import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from "@ngrx/store";
import { registerStart } from "./register.actions";
import { errorMsg, loading, successMsg } from "../store/auth.reducer";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // loading = false;
  // errorMessages: string[] = [];
  // successMessage = '';
  loading$ = this.store.select(loading);
  successMsg$ = this.store.select(successMsg);
  errorMessages = this.store.select(errorMsg);
  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get f() {
    return this.registerForm.controls;
  }

  constructor(private authService: AuthService, private fb: FormBuilder, private store: Store) {}

  createUser() {
    const { name, email, password } = this.registerForm.value;
    this.store.dispatch(registerStart({name, email, password }));
    this.registerForm.reset();
  }
}
