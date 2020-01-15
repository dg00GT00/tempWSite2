import {BrowserModule, EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PolygonConfigDirective} from './polygon/polygon-config.directive';
import {PolygonComponent} from './polygon/polygon.component';
import {ResizeObserverEventService} from './polygon/resize-observer-event.service';

@NgModule({
    declarations: [
        AppComponent,
        PolygonConfigDirective,
        PolygonComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [{provide: EVENT_MANAGER_PLUGINS, useClass: ResizeObserverEventService, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
