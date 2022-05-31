import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ProfileService } from 'src/app/services/profileService/profile.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: any;
  my_posts = [];
  liked_posts = [];
  loading = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public profileService: ProfileService,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUserByUID();
    this.getPostsByUID();
    this.getPostsByLikes();
    setTimeout(() => {
      this.loading = false;
    },3000);
  }

  getUserByUID() {
    let user = JSON.parse(localStorage.getItem('user'));
    
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

  getPostsByUID() {
    this.profileService.getPostsByUID(JSON.parse(localStorage.getItem('user')).uid).subscribe({
      next: (response) => {
        this.my_posts = response;
        setTimeout(() => {
          this.loading = false;
        },500)
      },
      error: (err: any) => {
        this.toaster.error(err.message)
      }
    })
  }

  getPostsByLikes() {
    this.profileService.getPostsByLikes(JSON.parse(localStorage.getItem('user')).uid).subscribe({
      next: (response) => {
        this.liked_posts = response;
        setTimeout(() => {
          this.loading = false;
        },500)
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
