import {Injectable} from '@angular/core';
import {ClipCorner, ClipSide, ClipSidePairs, IPolygonPoints} from '../../models/polygon-shape.types';
import {ClipPathConfig, PolygonShape} from '../../models/polygon-shape.model';

interface IConfigBothSides {
    degAngle: number;
    clipCorner: ClipCorner;
}

@Injectable()
export class PolygonCreationService {
    private polygonResult: IPolygonPoints;
    private config: ClipPathConfig;

    constructor() {
    }

    private baseConfig(degAngle: number, clipSide: ClipSide, clipCorner: ClipCorner): ClipSidePairs {
        this.config = new ClipPathConfig(degAngle);
        return this.config.clipConfig(clipSide, clipCorner);
    }

    setLeftSide(degAngle: number, clipCorner: ClipCorner): void {
        const poly = this.baseConfig(degAngle, ClipSide.Left, clipCorner);
        this.polygonResult = this.config.polygonArithmetic(poly);
    }

    setRightSide(degAngle: number, clipCorner: ClipCorner): void {
        const poly = this.baseConfig(degAngle, ClipSide.Right, clipCorner);
        this.polygonResult = this.config.polygonArithmetic(poly);
    }

    setBothSides(leftConfig: IConfigBothSides, rightConfig: IConfigBothSides): void {
        this.setRightSide(rightConfig.degAngle, rightConfig.clipCorner);
        const rightPoly = this.polygonResult;
        this.setLeftSide(leftConfig.degAngle, leftConfig.clipCorner);
        const leftPoly = this.polygonResult;
        this.polygonResult = PolygonShape.concatPolygons(leftPoly, rightPoly);
    }

    build(): string {
        return PolygonShape.build(this.polygonResult);
    }
}
