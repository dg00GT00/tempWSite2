import {PolygonDynClipService} from './polygon-dyn-clip.service';
import {TestBed} from '@angular/core/testing';
import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {PolygonAngleService} from './polygon-angle/polygon-angle.service';
import {IPolygonPoints} from '../../../models/polygon-shape.types';

class MockDynService extends PolygonDynClipService {
    set finalPolygon(polygon: IPolygonPoints) {
        super.finalPolygon = polygon;
    }
}

describe('The dynamic polygon clip service', () => {
    let polygonDynClipService: PolygonDynClipService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: PolygonDynClipService, deps: [PolygonCreationService, PolygonAngleService]}
            ]
        });
        polygonDynClipService = TestBed.get(PolygonDynClipService);
    });


});
