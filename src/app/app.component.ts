import {Compiler, Component, Injector, NgModuleFactory, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {MainPhotoModule} from './main-photo-carousel';

@Component({
    selector: 'app-root',
    template: `
        <app-main-header>
            <ng-container #vc></ng-container>
        </app-main-header>
        <app-main-body></app-main-body>`,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    test: any;

}
