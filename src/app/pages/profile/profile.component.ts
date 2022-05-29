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

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public profileService: ProfileService,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserByUID();
    this.getPostsByUID();
    this.getPostsByLikes(); 
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

  getPostsByUID() {
    this.profileService.getPostsByUID(JSON.parse(localStorage.getItem('user')).uid).subscribe({
      next: (response) => {
        this.my_posts = response;
        console.log(response)
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
        console.log(response)
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
