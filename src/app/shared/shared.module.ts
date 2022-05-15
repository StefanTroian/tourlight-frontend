import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { CarouselModule } from 'primeng/carousel';
import { LocationComponent } from './components/location/location.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [NavbarComponent, PostComponent, LocationComponent],
  exports: [NavbarComponent, PostComponent, LocationComponent],
  imports: [
    CommonModule,
    CarouselModule,
    GoogleMapsModule
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
