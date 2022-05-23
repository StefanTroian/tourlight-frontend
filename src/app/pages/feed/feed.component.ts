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

  posts:any [] = [];
  endLimit: number = 3;
  maxLimit: number;

  constructor(
    public feedService: FeedService,
    public toaster: ToastrService,
    public infiniteScroll: InfiniteScrollService
  ) { }

  ngOnInit(): void {
    this.posts = [];

    this.feedService.getFeedLength().subscribe({
      next: (response: any) => {
        if (response) {
          this.maxLimit = response;
          console.log(response);
          // this.maxLimit = this.maxLimit * 2;
    
          this.getFeed(this.endLimit);
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
          console.log('limit ', this.endLimit)
          this.getFeed(this.endLimit);
        }
      }
    })
  }

  ngAfterViewInit() {
    // console.log('after view init')
  }

  getFeed(endLimit: number) {

    console.log(endLimit)

    // if (endLimit <= this.maxLimit)
    this.feedService.getFeed(endLimit).subscribe({
      next: (response: any) => {
        if (response) {
          this.posts = this.posts.concat(response);
        }

        console.log(response)

        let clear = setInterval(() => {
          let target = document.querySelector(`#target${this.endLimit}`);
          if (target) {
            clearInterval(clear);
            this.infiniteScroll.setObserver().observe(target);
          }
        }, 0)        
      },
      error: (err: any) => {
        this.toaster.error(err.message)
      }
    });
  }
}
