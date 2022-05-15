import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    FeedComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GooglePlaceModule,
    GoogleMapsModule
  ]
})
export class PagesModule { }
