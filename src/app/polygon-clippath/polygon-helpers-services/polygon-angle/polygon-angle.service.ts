import {Injectable} from '@angular/core';
import {PolygonAbstractConfig} from '../polygon-abstract';
import {AngleConfig, ClipSide, IPolygonPoints} from '../../../../models/polygon-shape.types';
import {dispatchCalculation} from '../../../../models/polygon-shape.util';
import {interval, Observable, of, Subject} from 'rxjs';
import {audit, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PolygonAngleService extends PolygonAbstractConfig<AngleConfig, number> {
    private getSideAngle: string;
    private offsetWith: number;
    private offsetHeight: number;
    private subAngle = new Subject<string>();
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
        return this.innerConfig(clipPoints, polygon, ClipSide.Left);
    }

    private getRightAngle(clipPoints: string[], polygon: IPolygonPoints) {
        return this.innerConfig(clipPoints, polygon, ClipSide.Right);
    }

    private innerConfig(clipPoints: string[], polygon: IPolygonPoints, clipSide: ClipSide): number {
        for (const point of clipPoints) {
            const workPolygon = clipSide === 'Right' ? 100 - polygon[point].x : polygon[point].x;
            if (workPolygon !== 0) {
                return workPolygon * this.offsetWith / this.offsetHeight;
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
            filter(valueId => valueId === id),
            switchMap((valueId: string) => {
                let angle: number;
                angle = this.dispatchClipSides(this.mapPolygonById.get(valueId));
                return angle ? of(angle) : of(0);
            }),
            /*
            * Applied the audit and interval observables as auxiliary function for
            * filtering the multiple values received from the next values.
            * Even though a properly filter observable is employed at start of
            * observable chain, is needed do this ad hoc approach.
            * TODO: Research for better solution on the future
            */
            audit(() => interval(5)),
            distinctUntilChanged()
        );
    }

    setAngleIdMap(id: string, angleConfig: AngleConfig) {
        if (id) {
            this.mapPolygonById.set(id, angleConfig);
        }
        // Set call the next's observable function with id,
        // not the 'mapPolygonId' itself for the desire functionality
        this.subAngle.next(id);
    }
}
