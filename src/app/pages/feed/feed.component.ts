import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/services/feedService/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts!: [];

  constructor(
    public feedService: FeedService,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed() {
    this.feedService.getFeed().subscribe({
      next: (response: any) => {
        if (response) {
          this.posts = response;
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message)
      }
    });
  }
}
