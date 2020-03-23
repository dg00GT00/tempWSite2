import {Component} from '@angular/core';

@Component({
    selector: 'photo-stripe',
    template: `<span *ngFor="let _ of holes"></span>`,
    styles: [
            `span {
            margin: auto;
            width: 50%;
            height: 3%;
            border-radius: 25%;
            background-color: white;
        }`
    ]
})
export class MainPhotoStripeComponent {
    holes = [...Array(10).keys()];
}
