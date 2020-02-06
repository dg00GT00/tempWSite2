import {ClipSide} from '../../../../models/polygon-shape.types';
import {PolygonShape} from '../../../../models/polygon-shape.model';
import {MockCreationPolygon, mockResizeConfig} from '../polygon.mock';
import {TestBed} from '@angular/core/testing';
import {PolygonCreationService} from './polygon-creation.service';

describe('A created polygon', () => {
    let testCreationPolygon: MockCreationPolygon;
    const {both: bothConfig, left: leftConfig, right: rightConfig} = mockResizeConfig;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: PolygonCreationService, useClass: MockCreationPolygon}
            ]
        });
        testCreationPolygon = TestBed.get(PolygonCreationService);
    });

    it('should clip only the rightConfig side', () => {
        const rightPolygon = testCreationPolygon.dispatchClipSides(rightConfig);
        expect(rightPolygon).toEqual(jasmine.objectContaining(testCreationPolygon.mockPolygonCreation(10, ClipSide.Right)));
    });

    it('should clip only the leftConfig side', () => {
        const leftPolygon = testCreationPolygon.dispatchClipSides(leftConfig);
        expect(leftPolygon).toEqual(jasmine.objectContaining(testCreationPolygon.mockPolygonCreation(11, ClipSide.Left)));
    });

    it('should clip bothConfig sides', () => {
        const mockLeft = testCreationPolygon.mockPolygonCreation(12, ClipSide.Left);
        const mockRight = testCreationPolygon.mockPolygonCreation(13, ClipSide.Right);
        const bothPolygon = testCreationPolygon.dispatchClipSides(bothConfig);
        expect(bothPolygon).toEqual(jasmine.objectContaining(PolygonShape.concatPolygons(mockLeft, mockRight)));
    });
});
