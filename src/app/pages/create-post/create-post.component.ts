import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/shared/core/services/feedService/feed.service';
import { Post } from 'src/app/shared/core/interfaces/postInterface/post';
import { UserService } from 'src/app/shared/core/services/userService/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  loading = false;
  locations: {}[] = [];
  location: {} = {};
  post: Post;
  zoom = 14;
  longitude = '';
  latitude = '';
  marker = { position: {}}
  user;

  @ViewChild('mapInput') mapInput!: ElementRef;
  @ViewChild('minimumDays') minimumDays: ElementRef;
  @ViewChild('maximumDays') maximumDays: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  @ViewChild(GoogleMap) map!: GoogleMap;

  options = {
    types: [],
    componentRestrictions: { country: 'RO' }
  }

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false, 
    streetViewControl: false,
    fullscreenControl: false,
    zoom: this.zoom,
    center: { 
      lat: 44.4267674,
      lng: 26.1025384
    } // Bucharest
 }

  constructor(
    public feedService: FeedService,
    public toaster: ToastrService,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserByUID(JSON.parse(localStorage.getItem('user')).uid).subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message);
      }
    })
  }
  
  ngAfterViewInit(): void {
    this.resetForm();
  }

  addLocation() {
    if (this.mapInput.nativeElement.value) {
      this.loading = true;
      this.locations.push(this.location);
      this.closeModal.nativeElement.click();
      this.resetForm();
      setTimeout(() => {
        this.loading = false;
      }, 2000)
    } else {
      this.toaster.error(`Please complete location details`)
    }
  }

  addPost() {

    this.post = {
      username: this.user.displayName,
      userphoto: this.user.photoURL,
      useruid: this.user.uid,
      likes: [],
      locations: this.locations,
      minimumDays: this.minimumDays.nativeElement.value,
      maximumDays: this.maximumDays.nativeElement.value
    }

    if (this.locations.length) {
      if (this.minimumDays.nativeElement.value && this.maximumDays.nativeElement.value) {
        if (
          this.minimumDays.nativeElement.value >= 1 && this.minimumDays.nativeElement.value <= 10 &&
          this.maximumDays.nativeElement.value >= 1 && this.maximumDays.nativeElement.value <= 10
        ) {
          if (this.minimumDays.nativeElement.value <= this.maximumDays.nativeElement.value) {
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
      
            this.locations.forEach((location: any) => {
              this.feedService.createLocation(location).subscribe({
                next: (response: any) => {
                  if (response) {
                    this.toaster.success(response.message)
                  }
                },
                error: (err: any) => {
                  this.toaster.error(err.message)
                }
              })
            })
          } else {
            this.toaster.error(`Minimum days should be lower than maximum days.`)
          }
        } else {
          this.toaster.error(`Minimum and maximum days should be numbers between 1 and 10.`)
        }
      } else if (this.minimumDays.nativeElement.value == "" && this.maximumDays.nativeElement) {
        this.toaster.error(`Please add minimum days for tour duration.`)
      } else if (this.maximumDays.nativeElement.value == "" && this.minimumDays.nativeElement.value) {
        this.toaster.error(`Please add maximum days for tour duration.`)
      } else {
        this.toaster.error(`Please add tour duration.`)
      }
      

    } else {
      this.toaster.error(`Please add a location.`)
    }
  }

  public handleAddressChange(address: Address) {
    
    this.location = {
      'location_name': address.name,
      'address': address.vicinity,
      'rating': address.rating ? address.rating : 0,
      'website': address.website ? address.website : '',
      'lat': address.geometry.location.lat(),
      'lng': address.geometry.location.lng()
    }
    
    if (address.reviews) {
      let review = address.reviews.sort((a,b) => {
        return b['rating'] - a['rating']
      })[0]
      if (review) {
        this.location['bestReviewUsername'] = review.author_name
        this.location['bestReviewText'] = review.text
      }
    }

    this.marker = {
      position: {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      }
    }

    this.map.panTo(
      new google.maps.LatLng(address.geometry.location.lat(),address.geometry.location.lng())
    )
  }
  
  resetForm() {
    this.mapInput.nativeElement.value = "";
    this.marker = { position: {}};
    this.map.panTo(
      new google.maps.LatLng(this.mapOptions.center)
    )
  }

  resetDays() {
    this.minimumDays.nativeElement.value = "";
    this.maximumDays.nativeElement.value = "";
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

  getLoaded(event: any) {
    if (event) {
      this.loading = false;
    }
  }
}
