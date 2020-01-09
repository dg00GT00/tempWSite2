import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ResizeObserverDirective} from './polygon/resize-observer.directive';
import {PolygonComponent} from './polygon/polygon.component';

@NgModule({
    declarations: [
        AppComponent,
        ResizeObserverDirective,
        PolygonComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
