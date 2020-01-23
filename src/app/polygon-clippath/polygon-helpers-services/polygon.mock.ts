import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {ClipCorner, ClipSide, IPolygonConfig, IPolygonPoints} from '../../../models/polygon-shape.types';
import {ClipPathConfig} from '../../../models/polygon-shape.model';

export class MockCreationPolygon extends PolygonCreationService {
    mockPolygon(degAngle: number, clipSide: ClipSide): IPolygonPoints {
        const config = new ClipPathConfig(degAngle);
        const polygon = config.clipConfig(clipSide, ClipCorner.Up);
        return config.polygonArithmetic(polygon);
    }
}

export const mockPolygon: { [idx: string]: IPolygonConfig } = {
    right: {Right: {degAngle: 10, clipCorner: 'Up'}},
    left: {Left: {degAngle: 11, clipCorner: 'Up'}},
    both: {Both: {Left: {degAngle: 12, clipCorner: 'Up'}, Right: {degAngle: 13, clipCorner: 'Up'}}}
};
