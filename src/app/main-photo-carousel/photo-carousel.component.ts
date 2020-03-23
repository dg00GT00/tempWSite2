import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
    selector: 'photo-carousel',
    template: `
        <!--suppress TypeScriptUnresolvedFunction -->
        <ng-template #tmpl [appCarouselPhoto]="['something', 'another']" let-ctx="controller" let-photo>
            <button mat-icon-button [color]="buttonColor" (click)="ctx.prevPhoto()">
                <mat-icon color=buttonColor [fontSet]=fontSet>expand_less</mat-icon>
            </button>
            <main-photo [photo]="photo"></main-photo>
            <button mat-icon-button color="primary" (click)="ctx.nextPhoto()">
                <mat-icon [color]=buttonColor [fontSet]=fontSet>expand_more</mat-icon>
            </button>
        </ng-template>
    `,
    styles: [],

})
export class PhotoCarouselComponent {
    buttonColor: ThemePalette = 'primary';
    fontSet = 'material-icons-round';
}
