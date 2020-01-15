import {Injectable} from '@angular/core';
import {IConfigSides, IPolygonPoints, IResizeDirectiveConfig} from '../../models/polygon-shape.types';
import {PolygonCreationService} from './polygon-creation.service';
import {polygonDeepCopy} from '../../models/polygon-shape.util';

@Injectable({providedIn: 'root'})
export class PolygonDynCropService {
    private offsetWidth: number;
    private resizeCropWidth: number;
    private workerPolygon: IPolygonPoints;

    constructor(private polygonCreationService: PolygonCreationService) {
    }

    get isDynamic(): number {
        return this.resizeCropWidth;
    }

    setDynConfig(offsetWidth: number, resizeCropWidth: number): void {
        this.offsetWidth = offsetWidth;
        this.resizeCropWidth = resizeCropWidth;
    }

    setCropConfig(resizeConfig: IResizeDirectiveConfig): void {
        if (resizeConfig.Both) {
            this.bothSidesConfig(resizeConfig);
        }
        if (resizeConfig.Right) {
            this.rightSide(resizeConfig);
        }
        if (resizeConfig.Left) {
            this.leftSide(resizeConfig);
        }
    }

    buildPolygon(): string {
        return this.polygonCreationService.buildPolygon(this.workerPolygon);
    }

    private leftSide(resizeConfig: IResizeDirectiveConfig): void {
        this.workerPolygon = this.polygonCreationService.setLeftSide(resizeConfig.Left as IConfigSides);
        if (this.resizeCropWidth) {
            this.workerPolygon = this.calcLeftSide(this.workerPolygon);
        }
    }

    private rightSide(resizeConfig: IResizeDirectiveConfig): void {
        this.workerPolygon = this.polygonCreationService.setRightSide(resizeConfig.Right as IConfigSides);
        if (this.resizeCropWidth) {
            this.workerPolygon = this.calcRightSide(this.workerPolygon);
        }
    }

    private bothSidesConfig(resizeConfig: IResizeDirectiveConfig): void {
        this.workerPolygon = this.polygonCreationService.setBothSides(
            resizeConfig.Both.Left as IConfigSides,
            resizeConfig.Both.Right as IConfigSides);
        if (this.resizeCropWidth) {
            this.workerPolygon = this.calcBothSides(this.workerPolygon);
        }
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
        if (this.calcCropTax()) {
            for (const point in workerPolygon) {
                if (workerPolygon.hasOwnProperty(point)) {
                    if ((point === 'secondPoint' || point === 'thirdPoint') && workerPolygon[point].x !== 100) {
                        const diffPercentage = 100 - workerPolygon[point].x;
                        const partialPercentage = diffPercentage / this.calcCropTax();
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
        if (this.calcCropTax()) {
            for (const point in workerPolygon) {
                if (workerPolygon.hasOwnProperty(point)) {
                    if ((point === 'firstPoint' || point === 'fourthPoint' && workerPolygon[point].x === 0)) {
                        workerPolygon[point].x /= this.calcCropTax();
                    }
                }
            }
        } else {
            workerPolygon.firstPoint.x = workerPolygon.fourthPoint.x = this.calcCropTax();
        }
        return workerPolygon;
    }
}
