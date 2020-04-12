import {AfterViewInit, Component, Injector, TemplateRef, ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {FakePhotoService} from '../fake-photo.service';

@Component({
    selector: 'photo-carousel',
    template: `
        <!--suppress TypeScriptUnresolvedFunction -->
        <ng-template #tmpl [appCarouselPhoto]="['something', 'another']" let-ctx="controller" let-photo>
            <button mat-icon-button [color]="buttonColor" (click)="ctx.prevPhoto()">
                <mat-icon color=buttonColor [fontSet]=fontSet>expand_less</mat-icon>
            </button>
            <main-photo>
                <ng-template #photo></ng-template>
            </main-photo>
            <button mat-icon-button color="primary" (click)="ctx.nextPhoto()">
                <mat-icon [color]=buttonColor [fontSet]=fontSet>expand_more</mat-icon>
            </button>
        </ng-template>
    `,
    styles: [],
    providers: [FakePhotoService]

})
export class PhotoCarouselComponent implements AfterViewInit {
    buttonColor: ThemePalette = 'primary';
    fontSet = 'material-icons-round';
    @ViewChild('photo', {read: TemplateRef}) fakePhotoTemplate: TemplateRef<HTMLElement>;

    constructor(private fakePhotoService: FakePhotoService) {
    }

    ngAfterViewInit(): void {
        this.fakePhotoService.getPhotoPlaceHolder().subscribe(elem => {
            console.log(this.fakePhotoTemplate.createEmbeddedView(elem));
        });
    }
}
