import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
    selector: 'app-carousel-photo',
    template: `
        <!--suppress TypeScriptUnresolvedFunction -->
        <ng-template #tmpl [appCarouselPhoto]="['something', 'another']" let-ctx="controller" let-photo>
            <button mat-icon-button [color]="buttonColor" (click)="ctx.prevPhoto()">
                <mat-icon color=buttonColor [fontSet]=fontSet>expand_less</mat-icon>
            </button>
            <app-photo-frame [photo]="photo"></app-photo-frame>
            <button mat-icon-button color="primary" (click)="ctx.nextPhoto()">
                <mat-icon [color]=buttonColor [fontSet]=fontSet>expand_more</mat-icon>
            </button>
        </ng-template>
    `,
    styles: [],

})
export class CarouselPhotoComponent implements OnInit {
    buttonColor: ThemePalette = 'primary';
    fontSet = 'material-icons-round';

    constructor() {
    }

    ngOnInit(): void {

    }

}
