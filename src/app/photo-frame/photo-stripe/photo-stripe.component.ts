import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-photo-stripe',
    template: `<span *ngFor="let _ of holes" class="stripe-hole"></span>`,
    // language=SCSS
    styles: [
            `.stripe-hole {
            margin: auto;
            width: 50%;
            height: 3%;
            border-radius: 25%;
            background-color: white;
        }`
    ]
})
export class PhotoStripeComponent implements OnInit {
    holes = [...Array(10).keys()];

    constructor() {
    }

    ngOnInit(): void {
    }

}
