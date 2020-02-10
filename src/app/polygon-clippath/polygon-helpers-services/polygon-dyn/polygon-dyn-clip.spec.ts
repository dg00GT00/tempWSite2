import {PolygonDynClipService} from './polygon-dyn-clip.service';
import {TestBed} from '@angular/core/testing';
import {PolygonCreationService} from '../polygon-creation/polygon-creation.service';
import {PolygonAngleService} from '../polygon-angle/polygon-angle.service';
import {mockAngleConfig, mockResizeConfig} from '../polygon.mock';

describe('The dynamic polygon clip service', () => {
    const TEST_ID = 'test_id';
    let polygonDynClipService: PolygonDynClipService;
    let polygonCreationService: PolygonCreationService;
    const {right: mockRightPolygon, left: mockLeftPolygon, both: mockBothPolygon} = mockAngleConfig;
    const {right: mockRightResize, left: mockLeftResize, both: mockBothResize} = mockResizeConfig;
    // It was used the left side of the both's side configuration of the mock polygon because both
    // sides have receive the same value during the object construction process
    const mockPolygons = [mockRightPolygon.Right, mockLeftPolygon.Left, mockBothPolygon.Both.Left];
    const mockResConfig = [mockRightResize, mockLeftResize, mockBothResize];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: PolygonDynClipService, deps: [PolygonCreationService, PolygonAngleService]}
            ]
        });
        polygonDynClipService = TestBed.inject(PolygonDynClipService);
        polygonCreationService = TestBed.inject(PolygonCreationService);
    });

    /*
     For test that involve iteration, it's mandatory utilize the for loop version with index instead of for...of version.
     It's because inconsistency in order at which the karma/jasmine framework call each element in the array being iterated.
     It was observed that when used the for...of or some other variation of that statement (e.g. forEach), the elements in the
     array are built or disposed to the consumer function in a random way.
    */
    for (let i = 0; i < mockResConfig.length; i++) {
        it('should dispatch the main configuration of the service through the setClipConfig function', () => {
            polygonDynClipService.setClipConfig(polygonCreationService, mockResConfig[i], TEST_ID);
            expect(mockPolygons[i]).toEqual(jasmine.objectContaining(polygonDynClipService.finalPolygon));
        });
    }
});
