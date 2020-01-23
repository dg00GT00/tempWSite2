import {Injectable} from '@angular/core';
import {IPolygonConfig, IPolygonPoints} from '../../../models/polygon-shape.types';
import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {PolygonAbstractConfig} from './polygon-abstract';
import {PolygonAngleService} from './polygon-angle/polygon-angle.service';

@Injectable()
export class PolygonDynClipService {
    private finalPolygon: IPolygonPoints;

    constructor(private polygonCreationService: PolygonCreationService, private polygonAngleService: PolygonAngleService) {
    }

    setClipConfig(resizeConfig: PolygonAbstractConfig<IPolygonConfig, IPolygonPoints>, clipConfig: IPolygonConfig): void {
        this.finalPolygon = resizeConfig.dispatchClipSides(clipConfig);
        // Composite the PolygonAngleService
        this.polygonAngleService.setPolygonPoints(this.finalPolygon);
    }

    buildPolygon(): string {
        return this.polygonCreationService.buildPolygon(this.finalPolygon);
    }
}
