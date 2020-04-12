import {Component, Input} from '@angular/core';

@Component({
    selector: 'main-photo',
    template: `
        <div class="main-photo">
            <ng-content></ng-content>
        </div>`,
    styleUrls: ['./main-photo.component.scss']
})
export class MainPhotoComponent {
    @Input() photo: string;
}
