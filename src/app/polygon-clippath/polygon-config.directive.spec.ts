/* tslint:disable:prefer-for-of */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PolygonStubComponent, TestDirectiveModule} from './test-directive.module';
import {DebugElement} from '@angular/core';

describe('The PolygonConfigDirective', () => {
    let stubPolyComponent: PolygonStubComponent;
    let directiveConfigArray: DebugElement[];
    let stubPolyFixture: ComponentFixture<PolygonStubComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestDirectiveModule],
        });
        stubPolyFixture = TestBed.createComponent(PolygonStubComponent);
        stubPolyComponent = stubPolyFixture.debugElement.componentInstance;
    });

    /*
    * The following 'describe' test block is suspended for undefined period.
    * Waiting for the updates on one or all components of the test machinery
    * (Angular 9, Karma, Jasmine and/or IDE (WebStorm))
    * TODO: Analyse the pros and cons of another test framework for possible replacement of current one
    */

    // describe('defined as HTML attribute at PolygonStubComponent', () => {
    //     beforeEach(() => {
    //         stubPolyFixture.detectChanges();
    //         directiveConfigArray = stubPolyFixture.debugElement.queryAll(By.directive(PolygonConfigDirective));
    //     });
    //
    //     for (let i = 0; i < directiveConfigArray.length; i++) {
    //         it('should produce a polygon instances for each attribute on this component', () => {
    //             expect(directiveConfigArray[i].nativeElement).toBeDefined('The PolygonStubComponent do not produce any tag');
    //             expect(directiveConfigArray[i].injector.get<PolygonConfigDirective>(PolygonConfigDirective))
    //                 .toBeDefined('The PolygonDirectiveConfig was not injected in PolygonStubComponent');
    //         });
    //     }
    // });
});
