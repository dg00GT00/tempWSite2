interface IPoint {
    x: number;
    y: number;
}

interface IPolygonPoints {
    firstPoint: IPoint;
    secondPoint: IPoint;
    thirdPoint: IPoint;
    fourthPoint: IPoint;
}

enum ClipCorner {
    Down = 'DOWN',
    Up = 'UP'
}

enum ClipSide {
    Left = 'LEFT',
    Right = 'RIGHT',
}

function polygonDeepCopy<T>(source: T): T {
    const target: any = {};
    for (const objKey in source) {
        if (source.hasOwnProperty(objKey)) {
            if (typeof source[objKey] === 'object') {
                target[objKey] = {...source[objKey]};
            }
        }
    }
    return target;
}

class PolygonShape {
    private polygon: IPolygonPoints;

    private constructor(polygon?: IPolygonPoints) {
        if (polygon) {
            this.polygon = polygon;
        } else {
            this.polygon = PolygonShape.getDefaultPolygon();
        }
    }

    static createPolygon(polygon?: IPolygonPoints) {
        return new PolygonShape(polygon).polygon;
    }

    static getDefaultPolygon(): IPolygonPoints {
        return {
            firstPoint: {x: 0, y: 0},
            secondPoint: {x: 100, y: 0},
            thirdPoint: {x: 100, y: 100},
            fourthPoint: {x: 0, y: 100}
        };
    }

    static combine(polygon1: IPolygonPoints, polygon2: IPolygonPoints): IPolygonPoints {
        const copyPolygon1 = polygonDeepCopy(polygon1);
        const copyPolygon2 = polygonDeepCopy(polygon2);
        return {
            firstPoint: copyPolygon1.firstPoint,
            secondPoint: copyPolygon2.secondPoint,
            thirdPoint: copyPolygon1.thirdPoint,
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

type CLipRightSide = Omit<IPolygonPoints, 'firstPoint' | 'fourthPoint'>;
type ClipLeftSide = Omit<IPolygonPoints, 'secondPoint' | 'thirdPoint'>;
type ClipSidePairs = CLipRightSide | ClipLeftSide;

class ClipPathConfig {
    private xOffset: number;

    constructor(private polygonShape: IPolygonPoints, degreeAngle: number, height: number, width: number) {
        this.angleToOffsetX(degreeAngle, height, width);
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
                const {firstPoint, fourthPoint} = this.polygonShape;
                return polygonDeepCopy({firstPoint, fourthPoint});
            case ClipSide.Right:
                const {secondPoint, thirdPoint} = this.polygonShape;
                return polygonDeepCopy({secondPoint, thirdPoint});
        }
    }

    private angleToOffsetX(degreeAngle: number, height: number, width: number): void {
        const radAngle = (degreeAngle / 180) * Math.PI;
        const oppositeSide = Math.tan(radAngle) * height;
        this.xOffset = (oppositeSide / width) * 100;
    }

    clipConfig(clipSide: ClipSide, clipCorner: ClipCorner): ClipSidePairs {
        const resultClipSide = this.setClipSide(clipSide);
        return this.setClipCorner(clipCorner, resultClipSide);
    }

    polygonArithmetic(workerPolygon: ClipSidePairs, targetAxis: keyof IPoint = 'x'): IPolygonPoints {
        const resultPolygon = polygonDeepCopy(this.polygonShape);
        for (const point in workerPolygon) {
            if (workerPolygon.hasOwnProperty(point)) {
                resultPolygon[point][targetAxis] += workerPolygon[point][targetAxis];
            }
        }
        return resultPolygon;
    }

}

const polygon1 = PolygonShape.createPolygon({...PolygonShape.getDefaultPolygon(), firstPoint: {x: 10, y: 45}});
const config1 = new ClipPathConfig(polygon1, 34, 100, 100);
const clipPath1 = config1.clipConfig(ClipSide.Left, ClipCorner.Up);
const polygonResult1 = config1.polygonArithmetic(clipPath1);

const polygon2 = PolygonShape.createPolygon({
    ...PolygonShape.getDefaultPolygon(),
    firstPoint: {x: 45, y: 67},
    thirdPoint: {x: 200, y: 37}
});
const config2 = new ClipPathConfig(polygon2, 65, 100, 100);
const clipPath2 = config2.clipConfig(ClipSide.Right, ClipCorner.Up);

const polygonResult2 = config2.polygonArithmetic(clipPath2);

console.log(PolygonShape.combine(polygonResult1, polygonResult2));

