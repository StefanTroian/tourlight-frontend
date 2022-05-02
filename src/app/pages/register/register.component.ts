import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('userEmail') userEmail!: ElementRef;
  @ViewChild('userPassword') userPassword!: ElementRef;
  
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.userEmail.nativeElement.value, this.userPassword.nativeElement.value)
  }

  googleAuth() {
    this.authService.googleAuth();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
