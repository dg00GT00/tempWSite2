import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PolygonConfigDirective} from './polygon-config.directive';
import {PolygonDynClipService} from './polygon-helpers-services/polygon-dyn/polygon-dyn-clip.service';
import {PolygonCalcClipService} from './polygon-helpers-services/polygon-calc-clip.service';
import {PolygonAngleService} from './polygon-helpers-services/polygon-angle/polygon-angle.service';
import {Component, Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import {PolygonConfig} from '../../models/polygon-shape.types';
import {mockResizeConfig} from './polygon-helpers-services/polygon.mock';

@Injectable()
class PolygonConfigStub {
    constructor(public polygonConfig: PolygonConfig) {
    }
}

@Component({
    template: `
        <div *ngFor="let _ in array" [appPolygonConfig]="polygonConfig"></div>`,
    providers: [{provide: PolygonConfigStub, useFactory: () => new PolygonConfigStub(mockResizeConfig.right)}],
})
class PolygonStubComponent {
    array = Array(2);
    private polygonConfig: PolygonConfig;

    constructor(polygonServiceStub: PolygonConfigStub) {
        this.polygonConfig = polygonServiceStub.polygonConfig;
    }
}

// function polygonComponentFactory(polygonConfig: PolygonConfig): InjectionToken<PolygonStubComponent> {
//     return new InjectionToken<PolygonStubComponent>('TEST_POLYGON', {
//         factory: () => new PolygonStubComponent(polygonConfig)
//     });
// }

describe('The PolygonConfigDirective', () => {
    let stubPolyComponent: PolygonStubComponent;
    let polygonAngle: PolygonAngleService;
    let directiveConfig: PolygonConfigDirective;
    let stubPolyFixture: ComponentFixture<PolygonStubComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PolygonConfigDirective, PolygonStubComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [PolygonDynClipService, PolygonCalcClipService, PolygonAngleService]
        });
        polygonAngle = TestBed.inject(PolygonAngleService);
        directiveConfig = TestBed.inject(PolygonConfigDirective);
    });

    beforeEach(() => {
        stubPolyFixture = TestBed.createComponent(PolygonStubComponent);
        stubPolyComponent = stubPolyFixture.debugElement.componentInstance;
    });

    it('should be defined', () => {
        stubPolyFixture.detectChanges();
        expect(directiveConfig).toBeDefined();
    });

    it('should ', () => {

    });
});
