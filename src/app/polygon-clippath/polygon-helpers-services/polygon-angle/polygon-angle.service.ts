import {Injectable} from '@angular/core';
import {PolygonAbstractConfig} from '../polygon-abstract';
import {AngleConfig, ClipSide, IPolygonPoints} from '../../../../models/polygon-shape.types';
import {dispatchCalculation} from '../../../../models/polygon-shape.util';
import {Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, filter, switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PolygonAngleService extends PolygonAbstractConfig<AngleConfig, number> {
    private getSideAngle: string;
    private offsetWith: number;
    private offsetHeight: number;
    private subAngle = new Subject<Map<string, AngleConfig>>();
    mapPolygonById = new Map<string, AngleConfig>();

    protected configBothSides(angleConfig: AngleConfig): number {
        if (this.getSideAngle === ClipSide.Left) {
            return this.configLeftSide(angleConfig);
        }
        if (this.getSideAngle === ClipSide.Right) {
            return this.configRightSide(angleConfig);
        }
    }

    protected configLeftSide(angleConfig: AngleConfig): number {
        return dispatchCalculation<number>(angleConfig.Left, ClipSide.Left, this.getLeftAngle, this);
    }

    protected configRightSide(angleConfig: AngleConfig): number {
        return dispatchCalculation<number>(angleConfig.Right, ClipSide.Right, this.getRightAngle, this);
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

    setAngleConfig(offsetWidth: number, offsetHeight: number): void {
        this.offsetWith = offsetWidth;
        this.offsetHeight = offsetHeight;
    }

    getAngleById(id: string, clipSide?: ClipSide): Observable<number> {
        this.getSideAngle = clipSide;
        return this.subAngle.pipe(
            filter(mapValue => mapValue.has(id)),
            switchMap((mapValue: Map<string, AngleConfig>) => {
                let angle: number;
                console.log(id, mapValue.get(id));
                angle = this.dispatchClipSides(mapValue.get(id));
                return angle ? of(angle) : of(0);
            }),
            distinctUntilChanged()
        );
    }


    setAngleIdMap(id: string, angleConfig: AngleConfig) {
        if (id) {
            this.subAngle.next(this.mapPolygonById.set(id, angleConfig));
        }
    }
}
