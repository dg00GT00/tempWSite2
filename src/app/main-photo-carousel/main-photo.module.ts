import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LazyPhotoCarouselComponent} from './lazy-photo-carousel/lazy-photo-carousel.component';
import {MainPhotoStripeComponent} from './main-photo-stripe.component';
import {PhotoCarouselDirective} from './photo-carousel.directive';
import {PhotoCarouselComponent} from './photo-carousel.component';
import {MainPhotoComponent} from './main-photo.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        MainPhotoComponent,
        LazyPhotoCarouselComponent,
        MainPhotoStripeComponent,
        PhotoCarouselDirective,
        PhotoCarouselComponent
    ],
    imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule
    ],
})
export class MainPhotoModule {
}
