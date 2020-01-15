import {Injectable} from '@angular/core';
import {ClipCorner, ClipSide, ClipSidePairs, IConfigSides, IPolygonPoints} from '../../../models/polygon-shape.types';
import {ClipPathConfig, PolygonShape} from '../../../models/polygon-shape.model';

@Injectable({providedIn: 'root'})
export class PolygonCreationService {
    private config: ClipPathConfig;

    private baseConfig(degAngle: number, clipSide: ClipSide, clipCorner: ClipCorner): ClipSidePairs {
        this.config = new ClipPathConfig(degAngle);
        return this.config.clipConfig(clipSide, clipCorner);
    }

    setLeftSide(configSides: IConfigSides): IPolygonPoints {
        const poly = this.baseConfig(configSides.degAngle, ClipSide.Left, configSides.clipCorner);
        return this.config.polygonArithmetic(poly);
    }

    setRightSide(configSides: IConfigSides): IPolygonPoints {
        const poly = this.baseConfig(configSides.degAngle, ClipSide.Right, configSides.clipCorner);
        return this.config.polygonArithmetic(poly);
    }

    setBothSides(leftConfig: IConfigSides, rightConfig: IConfigSides): IPolygonPoints {
        const rightPoly = this.setRightSide(rightConfig);
        const leftPoly = this.setLeftSide(leftConfig);
        return PolygonShape.concatPolygons(leftPoly, rightPoly);
    }

    buildPolygon(finalPolygon: IPolygonPoints): string {
        return PolygonShape.build(finalPolygon);
    }
}
