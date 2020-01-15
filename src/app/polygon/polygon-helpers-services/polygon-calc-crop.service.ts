import {IConfigSides, IPolygonPoints, IPolygonConfig} from '../../../models/polygon-shape.types';
import {polygonDeepCopy} from '../../../models/polygon-shape.util';
import {PolygonCreationService} from './polygon-creation.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PolygonCalcCropService {
    private offsetWidth: number;
    private resizeCropWidth: number;

    constructor(private polygonCreationService: PolygonCreationService) {
    }

    setCropWidth(resizeCropWidth: number) {
        this.resizeCropWidth = resizeCropWidth;
    }

    setDynConfig(offsetWidth: number): void {
        this.offsetWidth = offsetWidth;
    }

    leftSide(resizeConfig: IPolygonConfig): IPolygonPoints {
        const leftSide = this.polygonCreationService.setLeftSide(resizeConfig.Left as IConfigSides);
        if (this.resizeCropWidth) {
            return this.calcLeftSide(leftSide);
        }
        return leftSide;
    }

    rightSide(resizeConfig: IPolygonConfig): IPolygonPoints {
        const rightSide = this.polygonCreationService.setRightSide(resizeConfig.Right as IConfigSides);
        if (this.resizeCropWidth) {
            return this.calcRightSide(rightSide);
        }
        return rightSide;
    }

    bothSidesConfig(resizeConfig: IPolygonConfig): IPolygonPoints {
        const bothSides = this.polygonCreationService.setBothSides(
            resizeConfig.Both.Left as IConfigSides,
            resizeConfig.Both.Right as IConfigSides);
        if (this.resizeCropWidth) {
            return this.calcBothSides(bothSides);
        }
        return bothSides;
    }

    private calcCropTax(): number {
        const widthAvailable = window.screen.availWidth;
        const denominator = this.offsetWidth - this.resizeCropWidth;
        const workDenominator = denominator < 0.05 ? 0 : denominator;
        let leftHandFraction;
        if (workDenominator) {
            leftHandFraction = (widthAvailable - this.resizeCropWidth) / workDenominator;
        }
        return leftHandFraction || 0;
    }

    private calcBothSides(sidePolygon: IPolygonPoints): IPolygonPoints {
        const partialResult = this.calcLeftSide(sidePolygon);
        return this.calcRightSide(partialResult);
    }

    private calcRightSide(sidePolygon: IPolygonPoints): IPolygonPoints {
        const workerPolygon = polygonDeepCopy(sidePolygon);
        const calcCropTax = this.calcCropTax();
        if (calcCropTax) {
            for (const point in workerPolygon) {
                if (workerPolygon.hasOwnProperty(point)) {
                    if ((point === 'secondPoint' || point === 'thirdPoint') && workerPolygon[point].x !== 100) {
                        const diffPercentage = 100 - workerPolygon[point].x;
                        const partialPercentage = diffPercentage / calcCropTax;
                        workerPolygon[point].x += diffPercentage - partialPercentage;
                    }
                }
            }
        } else {
            workerPolygon.secondPoint.x = workerPolygon.thirdPoint.x = 100;
        }
        return workerPolygon;
    }

    private calcLeftSide(sidePolygon: IPolygonPoints): IPolygonPoints {
        const workerPolygon = polygonDeepCopy(sidePolygon);
        const calcCropTax = this.calcCropTax();
        if (calcCropTax) {
            for (const point in workerPolygon) {
                if (workerPolygon.hasOwnProperty(point)) {
                    if ((point === 'firstPoint' || point === 'fourthPoint' && workerPolygon[point].x !== 0)) {
                        workerPolygon[point].x /= calcCropTax;
                    }
                }
            }
        } else {
            workerPolygon.firstPoint.x = workerPolygon.fourthPoint.x = calcCropTax;
        }
        return workerPolygon;
    }
}
