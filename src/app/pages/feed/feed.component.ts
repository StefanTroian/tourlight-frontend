import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/services/feedService/feed.service';
import { InfiniteScrollService } from 'src/app/services/infiniteScrollingService/infinite-scroll.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {
  
  loading = true;
  posts:any [] = [];
  topLocations:any [] = [];
  endLimit: number = 3;
  maxLimit: number;

  constructor(
    public feedService: FeedService,
    public toaster: ToastrService,
    public infiniteScroll: InfiniteScrollService
  ) { }

  ngOnInit(): void {
    this.posts = [];

    this.feedService.getTopLocations().subscribe({
      next: (response: any) => {
        if (response) {
          this.topLocations = response;
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message)
      }
    });

    this.feedService.getFeedLength().subscribe({
      next: (response: any) => {
        if (response) {
          this.maxLimit = response;
          this.getFeed(this.endLimit);
          this.loading = false;
        }       
      },
      error: (err: any) => {
        this.toaster.error(err.message)
      }
    });
    
    this.infiniteScroll.getObservable().subscribe(status => {
      if (status) {
        if (this.endLimit < this.maxLimit) {
          this.endLimit = this.endLimit + 3;
          this.loading = true;
          this.getFeed(this.endLimit);
        }
      }
    })
  }

  ngAfterViewInit() {
  }

  getFeed(endLimit: number) {

    this.feedService.getFeed(endLimit).subscribe({
      next: (response: any) => {
        if (response) {
          this.posts = this.posts.concat(response);
        }

        let clear = setInterval(() => {
          let target = document.querySelector(`#target${this.endLimit}`);
          if (target) {
            clearInterval(clear);
            this.infiniteScroll.setObserver().observe(target);
          }
        }, 0)  
        
        this.loading = false;
      },
      error: (err: any) => {
        this.toaster.error(err.message)
      }
    });
  }
}
