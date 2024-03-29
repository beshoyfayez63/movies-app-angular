import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authSerivce: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authSerivce.logout();
  }

  isAuth(): boolean {
    return this.authSerivce.isAuth();
  }
}
