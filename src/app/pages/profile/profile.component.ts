import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: any;
  constructor(
    public authService: AuthService,
    public userService: UserService,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserByUID();
  }

  getUserByUID() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user.uid);
    this.userService.getUserByUID(user.uid).subscribe({
      next: (response: any) => {
        if (response) {
          this.user = response;
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message)
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
