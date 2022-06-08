import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/core/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @ViewChild('userEmail') userEmail!: ElementRef;
  @ViewChild('userPassword') userPassword!: ElementRef;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['register'])
  }

  login() {
    this.authService.login(this.userEmail.nativeElement.value, this.userPassword.nativeElement.value)
  }

  googleAuth() {
    this.authService.googleAuth();
  }

  goToForgotPassword() {

  }
}
