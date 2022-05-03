import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { User } from 'src/app/services/userInterface/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: User;
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  goToFeed() {
    this.router.navigate(['feed']);
  }

  goToCreatePost() {
    this.router.navigate(['create-post']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }
}
