import {BrowserModule, EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ResizeObserverDirective} from './polygon/resize-observer.directive';
import {PolygonComponent} from './polygon/polygon.component';
import {ResizeObserverEventService} from './polygon/resize-observer-event.service';

@NgModule({
    declarations: [
        AppComponent,
        ResizeObserverDirective,
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
