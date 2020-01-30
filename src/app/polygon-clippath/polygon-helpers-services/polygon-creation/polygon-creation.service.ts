import {Injectable} from '@angular/core';
import {ClipCorner, ClipSide, ClipSidePairs, PolygonConfig, IPolygonPoints} from '../../../../models/polygon-shape.types';
import {ClipPathConfig, PolygonShape} from '../../../../models/polygon-shape.model';
import {PolygonAbstractConfig} from '../polygon-abstract';

@Injectable({
    providedIn: 'root',
})
export class PolygonCreationService extends PolygonAbstractConfig<PolygonConfig, IPolygonPoints> {
    private config: ClipPathConfig;

    private baseConfig(degAngle: number, clipSide: ClipSide, clipCorner: ClipCorner): ClipSidePairs {
        this.config = new ClipPathConfig(degAngle);
        return this.config.clipConfig(clipSide, clipCorner);
    }

    protected configLeftSide(configSide: PolygonConfig): IPolygonPoints {
        const {Left} = configSide;
        const poly = this.baseConfig(Left.degAngle, ClipSide.Left, Left.clipCorner as ClipCorner);
        return this.config.polygonArithmetic(poly);
    }

    protected configRightSide(configSide: PolygonConfig): IPolygonPoints {
        const {Right} = configSide;
        const poly = this.baseConfig(Right.degAngle, ClipSide.Right, Right.clipCorner as ClipCorner);
        return this.config.polygonArithmetic(poly);
    }

    protected configBothSides(configSides: PolygonConfig): IPolygonPoints {
        const rightPoly = this.configRightSide(configSides.Both);
        const leftPoly = this.configLeftSide(configSides.Both);
        return PolygonShape.concatPolygons(leftPoly, rightPoly);
    }

    buildPolygon(finalPolygon: IPolygonPoints): string {
        return PolygonShape.build(finalPolygon);
    }
}
