import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { logout } from "../../../app.actions";
import { user } from "../../../auth/store/auth.reducer";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$ = this.store.select(user);
  constructor(private store: Store) {}

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(logout());
  }
}
