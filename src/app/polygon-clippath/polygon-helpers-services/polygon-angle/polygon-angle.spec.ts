import {PolygonAngleService} from './polygon-angle.service';
import {mockAngleConfig, MockAngleService} from '../polygon.mock';
import {TestBed} from '@angular/core/testing';
import {AngleConfig} from '../../../../models/polygon-shape.types';
import {BehaviorSubject} from 'rxjs';

describe('The polygon angle', () => {
    let polygonAngle: MockAngleService;
    const TEST_ID = 'test-id';
    const {left: leftPolygon, right: rightPolygon, both: bothPolygon} = mockAngleConfig;
    const angleConfigArray = [leftPolygon, rightPolygon, bothPolygon];

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [MockAngleService]});
        polygonAngle = TestBed.get(PolygonAngleService);
        polygonAngle.setAngleConfig(500, 500);

    });
    describe('should have a field property with a map object assigned', () => {
        let mapPolygonById: Map<string, AngleConfig>;
        beforeEach(() => {
            mapPolygonById = polygonAngle.mapPolygonById;
        });

        angleConfigArray.forEach(polygon => {
            it('and an id\'s key set in which corresponds to the html id property', () => {
                polygonAngle.setAngleIdMap(TEST_ID, polygon);
                expect(mapPolygonById.get(TEST_ID)).toEqual(polygon);
            });
        });

        describe('that its values is emitted when the respective id is passed in on proper function', () => {
            let count = 0;
            beforeEach(() => {
                polygonAngle.subAngle = new BehaviorSubject<string>(TEST_ID);
                polygonAngle.setAngleIdMap(TEST_ID, angleConfigArray[count]);
            });

            afterEach(() => {
                count++;
            });

            angleConfigArray.forEach(_ => {
                it('should emit the correspondent angle to the respective side', () => {
                    polygonAngle.getAngleById(TEST_ID).subscribe(angle => {
                        expect(angle).toEqual(jasmine.any(Number));
                    });
                });
            });
        });
    });
});
