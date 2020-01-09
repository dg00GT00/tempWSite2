import {ClipCorner, ClipSide, ClipLeftSide, CLipRightSide, ClipSidePairs, IPoint, IPolygonPoints} from './polygon-shape.types';
import {polygonDeepCopy} from './polygon-shape.util';

export class PolygonShape {
    static getDefaultPolygon(): IPolygonPoints {
        return {
            firstPoint: {x: 0, y: 0},
            secondPoint: {x: 100, y: 0},
            thirdPoint: {x: 100, y: 100},
            fourthPoint: {x: 0, y: 100}
        };
    }

    static concatPolygons(polygon1: IPolygonPoints, polygon2: IPolygonPoints): IPolygonPoints {
        const copyPolygon1 = polygonDeepCopy(polygon1);
        const copyPolygon2 = polygonDeepCopy(polygon2);
        return {
            firstPoint: copyPolygon1.firstPoint,
            secondPoint: copyPolygon2.secondPoint,
            thirdPoint: copyPolygon2.thirdPoint,
            fourthPoint: copyPolygon1.fourthPoint
        };
    }

    static build(polygon: IPolygonPoints, unit: string = '%'): string {
        const polygonValues = Object.values(polygon);
        const condition = polygonValues.length - 1;
        let polygonString = 'polygon(';
        for (let point = 0; point <= condition; point++) {
            polygonString += `${polygonValues[point].x + unit} ${polygonValues[point].y + unit}`;
            if (point !== condition) {
                polygonString += ', ';
            }
        }
        polygonString += ')';
        return polygonString;
    }
}

export class ClipPathConfig {
    private xOffset: number;

    constructor(degreeAngle: number) {
        this.angleToOffsetX(degreeAngle);
    }

    private static isRightSide(clipSidePairs: ClipSidePairs): clipSidePairs is CLipRightSide {
        const sideCast = clipSidePairs as ClipLeftSide;
        return sideCast.firstPoint === undefined && sideCast.fourthPoint === undefined;
    }

    private static isLeftSide(clipSidePairs: ClipSidePairs): clipSidePairs is ClipLeftSide {
        const sideCast = clipSidePairs as CLipRightSide;
        return sideCast.secondPoint === undefined && sideCast.thirdPoint === undefined;
    }

    private setClipCorner(clipCorner: ClipCorner, clipSidePairs: ClipSidePairs): ClipSidePairs {
        switch (clipCorner) {
            case ClipCorner.Down:
                if (ClipPathConfig.isRightSide(clipSidePairs)) {
                    clipSidePairs.thirdPoint.x = -this.xOffset;
                    clipSidePairs.secondPoint.x = 0;
                }
                if (ClipPathConfig.isLeftSide(clipSidePairs)) {
                    clipSidePairs.fourthPoint.x = this.xOffset;
                    clipSidePairs.firstPoint.x = 0;
                }
                break;
            case ClipCorner.Up:
                if (ClipPathConfig.isRightSide(clipSidePairs)) {
                    clipSidePairs.secondPoint.x = -this.xOffset;
                    clipSidePairs.thirdPoint.x = 0;
                }
                if (ClipPathConfig.isLeftSide(clipSidePairs)) {
                    clipSidePairs.firstPoint.x = this.xOffset;
                    clipSidePairs.fourthPoint.x = 0;
                }
                break;
        }
        return clipSidePairs;
    }

    private setClipSide(clipSide: ClipSide): ClipSidePairs {
        switch (clipSide) {
            case ClipSide.Left:
                const {firstPoint, fourthPoint} = PolygonShape.getDefaultPolygon();
                return polygonDeepCopy({firstPoint, fourthPoint});
            case ClipSide.Right:
                const {secondPoint, thirdPoint} = PolygonShape.getDefaultPolygon();
                return polygonDeepCopy({secondPoint, thirdPoint});
        }
    }

    private angleToOffsetX(degreeAngle: number): void {
        const radAngle = (degreeAngle / 180) * Math.PI;
        const oppositeSide = Math.tan(radAngle) * 100;
        this.xOffset = (oppositeSide / 100) * 100;
    }

    clipConfig(clipSide: ClipSide, clipCorner: ClipCorner): ClipSidePairs {
        const resultClipSide = this.setClipSide(clipSide);
        return this.setClipCorner(clipCorner, resultClipSide);
    }

    polygonArithmetic(workerPolygon: ClipSidePairs, targetAxis: keyof IPoint = 'x'): IPolygonPoints {
        const resultPolygon = polygonDeepCopy(PolygonShape.getDefaultPolygon());
        for (const point in workerPolygon) {
            if (workerPolygon.hasOwnProperty(point)) {
                resultPolygon[point][targetAxis] += workerPolygon[point][targetAxis];
            }
        }
        return resultPolygon;
    }
}

