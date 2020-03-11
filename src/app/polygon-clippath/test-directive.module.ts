// Test module suspended. See note on polygon-config.directive.spec.ts file
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Injectable,
    NgModule,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PolygonConfig} from './models/polygon-shape.types';
import {mockResizeConfig} from './polygon-helpers-services/polygon.mock';
import {AppModule} from '../app.module';
import {PolygonComponent} from './polygon.component';

@Injectable()
class PolygonConfigStub {
    constructor(public polygonConfig: PolygonConfig) {
    }
}
// TODO: Confirm if the template in the test component supports any kind of view projection
@Component({
    template: `
        <ng-container #vc></ng-container>
        <ng-template *ngFor="let _ of array" [appPolygonConfig]="polygonConfig"></ng-template>`,
    providers: [{provide: PolygonConfigStub, useFactory: () => new PolygonConfigStub(mockResizeConfig.right)}],
})
export class PolygonStubComponent implements AfterViewInit {
    array = [...Array(2).keys()];
    private polygonConfig: PolygonConfig;
    @ViewChild('vc', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
    @ViewChildren(TemplateRef) templateRef: QueryList<TemplateRef<null>>;

    constructor(polygonServiceStub: PolygonConfigStub, private changeDetectorRef: ChangeDetectorRef) {
        this.polygonConfig = polygonServiceStub.polygonConfig;
    }

    ngAfterViewInit(): void {
        this.templateRef.forEach(template => this.viewContainer.createEmbeddedView(template));
        this.changeDetectorRef.detectChanges();
    }

    removePolygon(): void {
        this.viewContainer.remove();
    }

    resetPolyStyle(clipPath: string): void {
        return;
    }
}

@NgModule({
    declarations: [PolygonStubComponent],
    imports: [
        CommonModule,
        AppModule
    ],
    providers: [{provide: PolygonComponent, useClass: PolygonStubComponent}]
})
export class TestDirectiveModule {
}
