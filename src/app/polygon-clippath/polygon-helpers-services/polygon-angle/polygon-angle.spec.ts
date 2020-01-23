import {TestBed} from '@angular/core/testing';
import {PolygonCreationService} from '../polygon-creation/polygon-creation.service';
import {PolygonAngleService} from './polygon-angle.service';
import {mockPolygon} from '../polygon.mock';
import {ClipSide} from '../../../../models/polygon-shape.types';

describe('A polygon', () => {
    let polygonAngle: PolygonAngleService;
    let polygonCreation: PolygonCreationService;
    const {left, right, both} = mockPolygon;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [PolygonCreationService]});
        polygonAngle = TestBed.get(PolygonAngleService);
        polygonCreation = TestBed.get(PolygonCreationService);
    });

    it('with right clip side should have degAngle', () => {
        polygonCreation.dispatchClipSides(right);
        expect(polygonAngle.dispatchClipSides(right)).toBe(polygonCreation.getCurrentRadAngle());
    });

    it('with left clip side should have degAngle', () => {
        polygonCreation.dispatchClipSides(left);
        expect(polygonAngle.dispatchClipSides(left)).toBe(polygonCreation.getCurrentRadAngle());
    });

    describe('with both clip sides', () => {
        // Spy function for simulating the selection by class name of a HTML element which contains the clipPath style property
        // This function have the class name and ClipSide as arguments
        // The real implementation for this function will be tested on the consumer of this service
        const spyGetClipSide = jasmine.createSpyObj('spyGetClipSide', ['setSide']);

        ['Left', 'Right'].forEach(side => {
            it(`when took the ${side.toLowerCase()} side for getting the clip angle, should return a degAngle value`, () => {
                polygonCreation.dispatchClipSides(both);
                spyGetClipSide.setSide.withArgs('testCSSClass', ClipSide[side]).and.returnValue(polygonCreation.getCurrentRadAngle());
                expect(spyGetClipSide.setSide('testCSSClass', ClipSide[side])).toBe(polygonAngle.dispatchClipSides(both));
            });
        });
    });
});
