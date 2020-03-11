import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {AngleConfig, ClipCorner, ClipSide, IPolygonPoints, PolygonConfig} from '../models/polygon-shape.types';
import {ClipPathConfig} from '../models/polygon-shape.model';
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

const mockPolygon = new MockCreationPolygon();

export const mockResizeConfig: MockPolygonResult<PolygonConfig> = {
    right: {Right: {degAngle: 10, clipCorner: 'Up'}},
    left: {Left: {degAngle: 11, clipCorner: 'Up'}},
    both: {Both: {Left: {degAngle: 12, clipCorner: 'Up'}, Right: {degAngle: 13, clipCorner: 'Up'}}}
};

export const mockPolygonPoints: MockPolygonResult<IPolygonPoints> = {
    right: mockPolygon.dispatchClipSides(mockResizeConfig.right),
    left: mockPolygon.dispatchClipSides(mockResizeConfig.left),
    both: mockPolygon.dispatchClipSides(mockResizeConfig.both),
};

export const mockAngleConfig: MockPolygonResult<AngleConfig> = {
    right: {Right: mockPolygonPoints.right},
    left: {Left: mockPolygonPoints.left},
    both: {
        Both: {
            Left: mockPolygonPoints.both,
            Right: mockPolygonPoints.both,
        }
    }
};
