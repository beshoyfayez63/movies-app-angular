import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { loginStart } from "./login.actions";
import { errorMsg, loading } from "../store/auth.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading$ = this.store.select(loading);
  errorMessage$ = this.store.select(errorMsg);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(loginStart({ email, password }));
  }
}
