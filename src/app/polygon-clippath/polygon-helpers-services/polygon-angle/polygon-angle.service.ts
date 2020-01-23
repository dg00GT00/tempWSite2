import {Injectable} from '@angular/core';
import {PolygonAbstractConfig} from '../polygon-abstract';
import {ClipSide, IPolygonConfig, IPolygonPoints} from '../../../../models/polygon-shape.types';
import {dispatchCalculation} from '../../../../models/polygon-shape.util';

@Injectable({providedIn: 'root'})
export class PolygonAngleService extends PolygonAbstractConfig<IPolygonConfig, number> {
    private getSideAngle: string;
    private offsetWith: number;
    private offsetHeight: number;
    private polygonPoints: IPolygonPoints;
    mapPolygonById = new Map<string, IPolygonConfig>();

    protected configBothSides(): number {
        const leftAngle = this.configLeftSide();
        const rightAngle = this.configRightSide();
        if (this.getSideAngle === ClipSide.Left) {
            return leftAngle;
        }
        if (this.getSideAngle === ClipSide.Right) {
            return rightAngle;
        }
    }

    protected configLeftSide(): number {
        return dispatchCalculation<number>(this.polygonPoints, ClipSide.Left, this.getLeftAngle, this);
    }

    protected configRightSide(): number {
        return dispatchCalculation<number>(this.polygonPoints, ClipSide.Right, this.getRightAngle, this);
    }

    private getLeftAngle(clipPoints: string[], polygon: IPolygonPoints): number {
        return this.innerConfig(clipPoints, polygon, 0);
    }

    private getRightAngle(clipPoints: string[], polygon: IPolygonPoints) {
        return this.innerConfig(clipPoints, polygon, 100);
    }

    private innerConfig(clipPoints: string[], polygon: IPolygonPoints, percentageWatcher: number): number {
        for (const point of clipPoints) {
            if (polygon[point].x !== percentageWatcher) {
                const oppositeSide = polygon[point].x * this.offsetWith / this.offsetHeight;
                return Math.atan(oppositeSide);
            }
        }
    }

    setPolygonDim(offsetWidth: number, offsetHeight: number): void {
        this.offsetWith = offsetWidth;
        this.offsetHeight = offsetHeight;
    }

    setIdByPolygon(id: string, resizeConfig: IPolygonConfig): void {
        this.mapPolygonById.set(id, resizeConfig);
    }

    getAngleById(id: string, clipSide?: ClipSide): number {
        this.getSideAngle = clipSide;
        const resizeConfig = this.mapPolygonById.get(id);
        if (resizeConfig) {
            return this.dispatchClipSides(resizeConfig);
        }
    }

    setPolygonPoints(polygon: IPolygonPoints) {
        this.polygonPoints = polygon;
    }
}
