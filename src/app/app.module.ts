import {BrowserModule, EVENT_MANAGER_PLUGINS} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PolygonConfigDirective} from './polygon-clippath/polygon-config.directive';
import {PolygonComponent} from './polygon-clippath/polygon.component';
import {ResizeObserverEventService} from './polygon-clippath/polygon-helpers-services/resize-observer-event.service';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainBodyComponent} from './main-body/main-body.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,
        PolygonConfigDirective,
        PolygonComponent,
        MainHeaderComponent,
        MainBodyComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [{provide: EVENT_MANAGER_PLUGINS, useClass: ResizeObserverEventService, multi: true}],
    exports: [
        PolygonConfigDirective, // Exported to test-directive.module.ts
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
