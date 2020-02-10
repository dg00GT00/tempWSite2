import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {AngleConfig, ClipCorner, ClipSide, IPolygonPoints, PolygonConfig} from '../../../models/polygon-shape.types';
import {ClipPathConfig} from '../../../models/polygon-shape.model';
import {PolygonAngleService} from './polygon-angle/polygon-angle.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class MockCreationPolygon extends PolygonCreationService {
    // This function is used only at PolygonCreationService test file
    mockPolygonCreation(degAngle: number, clipSide: ClipSide): IPolygonPoints {
        const config = new ClipPathConfig(degAngle);
        const polygon = config.clipConfig(clipSide, ClipCorner.Up);
        return config.polygonArithmetic(polygon);
    }
}

@Injectable()
export class MockAngleService extends PolygonAngleService {
    set subAngle(subAngle: Subject<string>) {
        super.subAngle = subAngle;
    }
}

interface MockPolygonResult<T> {
    right: T;
    left: T;
    both: T;
}

export const mockResizeConfig: MockPolygonResult<PolygonConfig> = {
    right: {Right: {degAngle: 10, clipCorner: 'Up'}},
    left: {Left: {degAngle: 11, clipCorner: 'Up'}},
    both: {Both: {Left: {degAngle: 12, clipCorner: 'Up'}, Right: {degAngle: 13, clipCorner: 'Up'}}}
};

const mockPolygon = new MockCreationPolygon();

export const mockAngleConfig: MockPolygonResult<AngleConfig> = {
    right: {Right: mockPolygon.dispatchClipSides(mockResizeConfig.right)},
    left: {Left: mockPolygon.dispatchClipSides(mockResizeConfig.left)},
    both: {
        Both: {
            Left: mockPolygon.dispatchClipSides(mockResizeConfig.both),
            Right: mockPolygon.dispatchClipSides(mockResizeConfig.both),
        }
    }
};
