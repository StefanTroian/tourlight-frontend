import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/services/feedService/feed.service';
import { Post } from 'src/app/services/postInterface/post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  locations: {}[] = [];
  post: Post;
  @ViewChild('maps') maps!: ElementRef;
  @ViewChild('locationName') locationName!: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;

  constructor(
    public feedService: FeedService,
    public toaster: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.resetForm();
  }

  addLocation() {
    if (this.maps.nativeElement.value && this.locationName.nativeElement.value) {
      this.locations.push(
        {
          "id": "id locatie 1",
          "maps": this.maps.nativeElement.value,
          "location_name": this.locationName.nativeElement.value,
          "order_number": "order"
        }
      )
      this.closeModal.nativeElement.click();
      this.resetForm();
    } else {
      this.toaster.error(`Please complete location details`)
    }
  }

  addPost() {
    let user = JSON.parse(localStorage.getItem('user'));

    this.post = {
      username: user.displayName,
      userphoto: user.photoURL,
      useruid: user.uid,
      likes: [],
      locations: this.locations
    }

    if (this.locations.length) {
      this.feedService.createPost(this.post).subscribe({
        next: (response: any) => {
          if (response) {
            this.toaster.success(response.message)
          }
        },
        error: (err: any) => {
          this.toaster.error(err.message)
        }
      })
  
      this.router.navigate(['feed']).then(() => {
        window.location.reload();
      });
    } else {
      this.toaster.error(`Please add a location`)
    }
  }
  
  resetForm() {
    this.maps.nativeElement.value = "";
    this.locationName.nativeElement.value = "";
  }

  resetPost() {
    this.post = {
      username: "",
      userphoto: "",
      useruid: "",
      likes: [],
      locations: []
    }
  }
}
