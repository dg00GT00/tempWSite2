/* tslint:disable:prefer-for-of */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PolygonConfigDirective} from './polygon-config.directive';
import {By} from '@angular/platform-browser';
import {PolygonStubComponent, TestingModule} from './testing.module';
import {DebugElement} from '@angular/core';

describe('The PolygonConfigDirective', () => {
    let stubPolyComponent: PolygonStubComponent;
    let directiveConfigArray: DebugElement[];
    let stubPolyFixture: ComponentFixture<PolygonStubComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestingModule],
        });
        stubPolyFixture = TestBed.createComponent(PolygonStubComponent);
        stubPolyComponent = stubPolyFixture.debugElement.componentInstance;
    });

    describe('defined as HTML attribute at PolygonStubComponent', () => {
        beforeEach(() => {
            stubPolyFixture.detectChanges();
            directiveConfigArray = stubPolyFixture.debugElement.queryAll(By.directive(PolygonConfigDirective));
        });

        for (let i = 0; i < directiveConfigArray.length; i++) {
            it('should produce a polygon instances for each attribute on this component', () => {
                expect(directiveConfigArray[i].nativeElement).toBeDefined('The PolygonStubComponent do not produce any tag');
                expect(directiveConfigArray[i].injector.get<PolygonConfigDirective>(PolygonConfigDirective))
                    .toBeDefined('The PolygonDirectiveConfig was not injected in PolygonStubComponent');
            });
        }
    });
});
