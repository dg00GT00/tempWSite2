import {BrowserModule, EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PolygonConfigDirective} from './polygon-clippath/polygon-config.directive';
import {PolygonComponent} from './polygon-clippath/polygon.component';
import {ResizeObserverEventService} from './polygon-clippath/polygon-helpers-services/resize-observer-event.service';
import {MainHeaderComponent} from './main-header/main-header.component';
import { PhotoFrameComponent } from './photo-frame/photo-frame.component';

@NgModule({
    declarations: [
        AppComponent,
        PolygonConfigDirective,
        PolygonComponent,
        MainHeaderComponent,
        PhotoFrameComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [{provide: EVENT_MANAGER_PLUGINS, useClass: ResizeObserverEventService, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
