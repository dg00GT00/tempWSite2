import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {AngleConfig, ClipCorner, ClipSide, IPolygonPoints, PolygonConfig} from '../../../models/polygon-shape.types';
import {ClipPathConfig} from '../../../models/polygon-shape.model';
import {PolygonAngleService} from './polygon-angle/polygon-angle.service';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class MockCreationPolygon extends PolygonCreationService {
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

export const mockResizeConfig: { [idx: string]: PolygonConfig } = {
    right: {Right: {degAngle: 10, clipCorner: 'Up'}},
    left: {Left: {degAngle: 11, clipCorner: 'Up'}},
    both: {Both: {Left: {degAngle: 12, clipCorner: 'Up'}, Right: {degAngle: 13, clipCorner: 'Up'}}}
};

const mockPolygon = new MockCreationPolygon();

export const mockAngleConfig: { [idx: string]: AngleConfig } = {
    right: {Right: mockPolygon.dispatchClipSides(mockResizeConfig.right)},
    left: {Left: mockPolygon.dispatchClipSides(mockResizeConfig.left)},
    both: {
        Both: {
            Left: mockPolygon.dispatchClipSides(mockResizeConfig.Both),
            Right: mockPolygon.dispatchClipSides(mockResizeConfig.Both),
        }
    }
};
