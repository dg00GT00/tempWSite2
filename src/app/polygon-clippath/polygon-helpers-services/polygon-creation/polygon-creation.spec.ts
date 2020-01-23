import {ClipSide} from '../../../../models/polygon-shape.types';
import {PolygonShape} from '../../../../models/polygon-shape.model';
import {MockCreationPolygon, mockPolygon} from '../polygon.mock';

describe('A created polygon', () => {
    let testCreationPolygon: MockCreationPolygon;
    const {both, left, right} = mockPolygon;

    beforeEach(() => {
        testCreationPolygon = new MockCreationPolygon();
    });

    it('should clip only the right side', () => {
        const rightPolygon = testCreationPolygon.dispatchClipSides(right);
        expect(rightPolygon).toEqual(jasmine.objectContaining(testCreationPolygon.mockPolygon(10, ClipSide.Right)));
    });

    it('should clip only the left side', () => {
        const leftPolygon = testCreationPolygon.dispatchClipSides(left);
        expect(leftPolygon).toEqual(jasmine.objectContaining(testCreationPolygon.mockPolygon(11, ClipSide.Left)));
    });

    it('should clip both sides', () => {
        const mockLeft = testCreationPolygon.mockPolygon(12, ClipSide.Left);
        const mockRight = testCreationPolygon.mockPolygon(13, ClipSide.Right);
        const bothPolygon = testCreationPolygon.dispatchClipSides(both);
        expect(bothPolygon).toEqual(jasmine.objectContaining(PolygonShape.concatPolygons(mockLeft, mockRight)));
    });
});
