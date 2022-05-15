import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() location;
  marker = { position: {}}

  @ViewChild(GoogleMap) map!: GoogleMap;

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false, 
    streetViewControl: false,
    fullscreenControl: false,
    zoom: 14,
    center: { 
      lat: 44.4267674,
      lng: 26.1025384
    } // Bucharest
 }

  constructor() { }

  ngOnInit(): void {
    this.mapOptions.center.lat = this.location.lat;
    this.mapOptions.center.lng = this.location.lng;
    this.marker = {
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    }
  }

}
