import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/core/services/authService/auth.service';
import { User } from 'src/app/shared/core/interfaces/userInterface/user';
import { UserService } from 'src/app/shared/core/services/userService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: User;
  constructor(
    public router: Router,
    public userService: UserService,
    public toasterService: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);

    this.userService.getUserByUID(this.user.uid).subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
        }
      },
      error: (err: any) => {
        this.toasterService.error(err.message);
      }
    })
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
//AIzaSyARLlK79L8u7C82RFAqhoIeKOvb0zjp814