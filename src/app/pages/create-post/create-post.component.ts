import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/services/feedService/feed.service';
import { Post } from 'src/app/services/postInterface/post';

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
    public router: Router
  ) { }

  ngOnInit(): void {
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
    let user = JSON.parse(localStorage.getItem('user'));

    this.post = {
      username: user.displayName,
      userphoto: user.photoURL,
      useruid: user.uid,
      likes: [],
      locations: this.locations,
      minimumDays: this.minimumDays.nativeElement.value,
      maximumDays: this.maximumDays.nativeElement.value
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

  public handleAddressChange(address: Address) {
    console.log(address)
    
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
