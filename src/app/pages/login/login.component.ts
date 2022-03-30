import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @ViewChild('userName') userName!: ElementRef;
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
    this.authService.login(this.userName.nativeElement.value, this.userPassword.nativeElement.value)
  }

  googleAuth() {
    this.authService.googleAuth();
  }

  goToForgotPassword() {

  }
}
