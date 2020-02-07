import {ClipSide, IPolygonPoints, PolygonConfig} from '../../../models/polygon-shape.types';
import {dispatchCalculation, polygonDeepCopy} from '../../../models/polygon-shape.util';
import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {Injectable} from '@angular/core';

// This service doesn't need the @Injectable decorator because
// it inherit from a service that implement it
@Injectable()
export class PolygonCalcClipService extends PolygonCreationService {
    /*
     The current width of the component being observed
    */
    private offsetWidth: number;
    /*
     Receives the value threshold in which the polygon component will finish its
     clip resize mechanism. This value correspond to the component screen width in pixels
    */
    private resizeCropWidth: number;

    setOffsetWidth(offsetWidth: number) {
        this.offsetWidth = offsetWidth;
    }

    setClipWidth(resizeCropWidth: number) {
        this.resizeCropWidth = resizeCropWidth;
    }

    protected configLeftSide(resizeConfig: PolygonConfig): IPolygonPoints {
        const leftSide = super.configLeftSide(resizeConfig);
        if (this.resizeCropWidth) {
            return dispatchCalculation(leftSide, ClipSide.Left, this.calcLeftSide, this);
        }
        return leftSide;
    }

    protected configRightSide(resizeConfig: PolygonConfig): IPolygonPoints {
        const rightSide = super.configRightSide(resizeConfig);
        if (this.resizeCropWidth) {
            return dispatchCalculation(rightSide, ClipSide.Right, this.calcRightSide, this);
        }
        return rightSide;
    }

    protected configBothSides(resizeConfig: PolygonConfig): IPolygonPoints {
        const bothSides = super.configBothSides(resizeConfig);
        if (this.resizeCropWidth) {
            const partialPolygon = dispatchCalculation(bothSides, ClipSide.Left, this.calcLeftSide);
            return dispatchCalculation(partialPolygon, ClipSide.Right, this.calcRightSide);
        }
        return bothSides;
    }

    private calcCropTax(): number {
        const denominator = this.offsetWidth - this.resizeCropWidth;
        const workDenominator = denominator < 0.05 ? 0 : denominator;
        let leftHandFraction: number;
        if (workDenominator) {
            leftHandFraction = (window.screen.availWidth - this.resizeCropWidth) / workDenominator;
        }
        return leftHandFraction || workDenominator;
    }

    private innerConfig(sidePolygon: IPolygonPoints): { calcCropTax: number; workerPolygon: IPolygonPoints } {
        const workerPolygon = polygonDeepCopy(sidePolygon);
        const calcCropTax = this.calcCropTax();
        return {workerPolygon, calcCropTax};
    }

    private calcRightSide(clipPoints: string[], polygon: IPolygonPoints): IPolygonPoints {
        const {workerPolygon, calcCropTax} = this.innerConfig(polygon);
        if (calcCropTax) {
            for (const point of clipPoints) {
                const diffPercentage = 100 - workerPolygon[point].x;
                const partialPercentage = diffPercentage / calcCropTax;
                workerPolygon[point].x += diffPercentage - partialPercentage;
            }
        } else {
            workerPolygon.secondPoint.x = workerPolygon.thirdPoint.x = 100;
        }
        return workerPolygon;
    }

    private calcLeftSide(clipPoints: string[], polygon: IPolygonPoints): IPolygonPoints {
        const {workerPolygon, calcCropTax} = this.innerConfig(polygon);
        if (calcCropTax) {
            for (const point of clipPoints) {
                workerPolygon[point].x /= calcCropTax;
            }
        } else {
            workerPolygon.firstPoint.x = workerPolygon.fourthPoint.x = calcCropTax;
        }
        return workerPolygon;
    }
}
