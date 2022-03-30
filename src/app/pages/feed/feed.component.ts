import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FeedService } from 'src/app/services/feedService/feed.service';
import { User } from 'src/app/services/userInterface/user';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  message!: string;
  user!: User;

  constructor(
    public feedService: FeedService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed().subscribe({
      next: (response: any) => {
        this.message = response.message;
      },
      error: (err) => {
        this.toaster.error(err.message)
      }
    });

    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    this.authService.logout();
  }

}
