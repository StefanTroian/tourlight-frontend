import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/services/feedService/feed.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  loading = true;
  heart: 'fas fa-heart' | 'far fa-heart' = 'far fa-heart';
  likes = [];
  liked_posts = [];

  @Input() post;

  constructor(
    public feedService: FeedService,
    public toaster: ToastrService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.post.dateCreated = new Date(this.post.dateCreated);

    // get likes from post
    this.feedService.getPostById(this.post.id).subscribe({
      next: (response) => {
        if (response) {
          if (response.likes.includes(JSON.parse(localStorage.getItem('user')).uid)) {
            this.heart = 'fas fa-heart';
          }

          this.likes = response.likes;
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message);
        this.heart = 'far fa-heart';
        this.likes = this.post.likes;
      }
    });

    // get liked posts from user
    this.userService.getUserByUID(JSON.parse(localStorage.getItem('user')).uid).subscribe({
      next: (response) => {
        if (response) {
          if (response.liked_posts.length) {
            this.liked_posts = response.liked_posts;
          }
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message);
      }
    })
  }

  getLoaded(event: any) {
    if (event) {
      this.loading = false;
    }
  }

  toggleHeart() {
    
    if (this.heart == 'fas fa-heart') { // Remove like
      
      this.heart = 'far fa-heart';

      // update post likes
      if (this.likes.includes(JSON.parse(localStorage.getItem('user')).uid)) {

        const index = this.likes.indexOf(JSON.parse(localStorage.getItem('user')).uid);
        if (index > -1) {
          this.likes.splice(index, 1);
        }
        
        this.feedService.updatePost(this.post.id, { likes: this.likes }).subscribe({
          next: (response) => {
            this.heart = 'far fa-heart';
          },
          error: (err: any) => {
            this.heart = 'fas fa-heart';
            this.toaster.error(err.message)
          }
        });

      }
      
      //update liked post from user
      if (this.liked_posts.includes(this.post.id)) {

        const index = this.liked_posts.indexOf(this.post.id);
        if (index > -1) {
          this.liked_posts.splice(index, 1);
        }
        
        this.userService.updateUser(JSON.parse(localStorage.getItem('user')).uid, { liked_posts: this.liked_posts }).subscribe({
          next: (response) => {
          },
          error: (err: any) => {
            this.toaster.error(err.message)
          }
        });

      }
      
    } else if (this.heart == 'far fa-heart') {  // Add like

      // update post likes
      this.likes.push(JSON.parse(localStorage.getItem('user')).uid)

      this.heart = 'fas fa-heart';
      this.feedService.updatePost(this.post.id, { likes: this.likes }).subscribe({
        next: (response) => {
          this.heart = 'fas fa-heart';
        },
        error: (err: any) => {
          this.heart = 'far fa-heart';
          this.toaster.error(err.message)
        }
      });

      //update liked post from user
      this.liked_posts.push(this.post.id)

      this.userService.updateUser(JSON.parse(localStorage.getItem('user')).uid, { liked_posts: this.liked_posts }).subscribe({
        next: (response) => {
          // get liked posts from user
          this.userService.getUserByUID(JSON.parse(localStorage.getItem('user')).uid).subscribe({
            next: (response) => {
              if (response) {
                if (response.liked_posts.length) {
                  this.liked_posts = response.liked_posts;
                }
              }
            },
            error: (err: any) => {
              this.toaster.error(err.message);
            }
          })         
        },
        error: (err: any) => {
          this.toaster.error(err.message)
        }
      });

    }
  }

}
