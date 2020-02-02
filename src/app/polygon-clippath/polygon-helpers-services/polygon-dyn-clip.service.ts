import {Injectable} from '@angular/core';
import {AngleConfig, IPolygonPoints, PolygonConfig} from '../../../models/polygon-shape.types';
import {PolygonCreationService} from './polygon-creation/polygon-creation.service';
import {PolygonAbstractConfig} from './polygon-abstract';
import {PolygonAngleService} from './polygon-angle/polygon-angle.service';

@Injectable()
export class PolygonDynClipService extends PolygonAbstractConfig<PolygonConfig, AngleConfig> {
    private finalPolygon: IPolygonPoints;

    constructor(private polygonCreationService: PolygonCreationService, private polygonAngleService: PolygonAngleService) {
        super();
    }

    private setAngleId(id: string, clipConfig: PolygonConfig): void {
        // Composing the angle service
        const angleConfig = this.dispatchClipSides(clipConfig);
        this.polygonAngleService.setAngleIdMap(id, angleConfig);
    }

    protected configBothSides(): AngleConfig {
        return {Both: {Left: this.finalPolygon, Right: this.finalPolygon}};
    }

    protected configLeftSide(): AngleConfig {
        return {Left: this.finalPolygon};
    }

    protected configRightSide(): AngleConfig {
        return {Right: this.finalPolygon};
    }

    setClipConfig(resizeConfig: PolygonAbstractConfig<PolygonConfig, IPolygonPoints>,
                  clipConfig: PolygonConfig, id: string): void {
        this.finalPolygon = resizeConfig.dispatchClipSides(clipConfig);
        this.setAngleId(id, clipConfig);
    }

    buildPolygon(): string {
        return this.polygonCreationService.buildPolygon(this.finalPolygon);
    }
}
