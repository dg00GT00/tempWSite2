import {Injectable} from '@angular/core';
import {IPolygonConfig, IPolygonPoints} from '../../../models/polygon-shape.types';
import {PolygonCreationService} from './polygon-creation.service';
import {PolygonCalcCropService} from './polygon-calc-crop.service';

@Injectable({providedIn: 'root'})
export class PolygonDynCropService {
    private finalPolygon: IPolygonPoints;

    constructor(
        private polygonCreationService: PolygonCreationService,
        private polygonCalcCropService: PolygonCalcCropService
    ) {
    }

    setCropConfig(resizeConfig: IPolygonConfig): void {
        if (resizeConfig.Both) {
            this.finalPolygon = this.polygonCalcCropService.bothSidesConfig(resizeConfig);
        }
        if (resizeConfig.Right) {
            this.finalPolygon = this.polygonCalcCropService.rightSide(resizeConfig);
        }
        if (resizeConfig.Left) {
            this.finalPolygon = this.polygonCalcCropService.leftSide(resizeConfig);
        }
    }

    buildPolygon(): string {
        return this.polygonCreationService.buildPolygon(this.finalPolygon);
    }
}
