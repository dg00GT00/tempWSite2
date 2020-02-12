/* tslint:disable:prefer-for-of */
import {PolygonComponent} from './polygon.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PolygonDynClipService} from './polygon-helpers-services/polygon-dyn/polygon-dyn-clip.service';
import {mockPolygonPoints} from './polygon-helpers-services/polygon.mock';
import {By} from '@angular/platform-browser';

describe('The PolygonComponent', () => {
    let polygonComponent: PolygonComponent;
    let polygonDynService: PolygonDynClipService;
    let polygonFixture: ComponentFixture<PolygonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PolygonComponent],
            providers: [PolygonDynClipService]
        });
        polygonDynService = TestBed.inject(PolygonDynClipService);
    });

    beforeEach(() => {
        polygonFixture = TestBed.createComponent(PolygonComponent);
        polygonComponent = polygonFixture.debugElement.componentInstance;
    });

    it('should be defined', () => {
        expect(polygonComponent).toBeDefined('The PolygonComponent is undefined');
    });

    it('should have an empty object as polygonStyle before ngAfterViewInit to run', () => {
        expect(polygonComponent.polygonStyle)
            .toEqual(jasmine.objectContaining({}), 'The polygonStyle object is not empty');
    });

    describe('should display the clip-path style attribute', () => {
        const {left: leftPolygon, right: rightPolygon, both: bothPolygon} = mockPolygonPoints;
        const polygonPoints = [leftPolygon, rightPolygon, bothPolygon];

        for (let i = 0; i < polygonPoints.length; i++) {
            it('for each mockPolygon side ', () => {
                polygonDynService.finalPolygon = polygonPoints[i];
                polygonComponent.ngAfterViewInit();
                polygonFixture.detectChanges();
                const polygonClipPath: HTMLElement = polygonFixture.debugElement.query(By.css('div')).nativeElement;
                expect(polygonClipPath.style['clip-path']).toEqual(jasmine.any(String));
                expect(polygonComponent.polygonStyle.clipPath).toEqual(polygonDynService.buildPolygon());
            });
        }
    });
});
