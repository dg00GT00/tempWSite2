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

class PolygonShape {
    public defaultPolygon: IPolygonPoints = {
        firstPoint: {x: 0, y: 0},
        secondPoint: {x: 100, y: 0},
        thirdPoint: {x: 100, y: 100},
        fourthPoint: {x: 0, y: 100}
    };

    constructor(polygon?: IPolygonPoints) {
        if (polygon) {
            this.defaultPolygon = polygon;
        }
    }

    build(polygon: IPolygonPoints, unit: string = '%'): string {
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

class ClipPath {
    private xOffset: number;

    constructor(private polygonShape: PolygonShape, degreeAngle: number, height: number, width: number) {
        this.angleToOffsetX(degreeAngle, height, width);
    }

    private static isRightSide(clipSidePairs: ClipSidePairs): clipSidePairs is CLipRightSide {
        const sideCast = clipSidePairs as CLipRightSide;
        return sideCast.secondPoint !== undefined && sideCast.thirdPoint !== undefined;
    }

    private setClipCorner(clipCorner: ClipCorner, clipSidePairs: ClipSidePairs): ClipSidePairs {
        switch (clipCorner) {
            case ClipCorner.Down:
                if (ClipPath.isRightSide(clipSidePairs)) {
                    clipSidePairs.thirdPoint.x = -this.xOffset;
                    clipSidePairs.secondPoint.x = 0;
                } else {
                    clipSidePairs.fourthPoint.x = this.xOffset;
                    clipSidePairs.firstPoint.x = 0;
                }
                break;
            case ClipCorner.Up:
                if (ClipPath.isRightSide(clipSidePairs)) {
                    clipSidePairs.secondPoint.x = -this.xOffset;
                    clipSidePairs.thirdPoint.x = 0;
                } else {
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
                const {firstPoint, fourthPoint} = this.polygonShape.defaultPolygon;
                return {firstPoint: {...firstPoint}, fourthPoint: {...fourthPoint}};
            case ClipSide.Right:
                const {secondPoint, thirdPoint} = this.polygonShape.defaultPolygon;
                return {secondPoint: {...secondPoint}, thirdPoint: {...thirdPoint}};
            default:
                return {...this.polygonShape.defaultPolygon};
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
        const resultPolygon = {...this.polygonShape.defaultPolygon};
        for (const point in workerPolygon) {
            if (workerPolygon.hasOwnProperty(point)) {
                resultPolygon[point][targetAxis] += workerPolygon[point][targetAxis];
            }
        }
        return resultPolygon;
    }

}

const polygon = new PolygonShape({...new PolygonShape().defaultPolygon, firstPoint: {x: 10, y: 45}});
const config = new ClipPath(polygon, 34, 100, 100);
const clipPath = config.clipConfig(ClipSide.Left, ClipCorner.Up);
const polygonResult = config.polygonArithmetic(new PolygonShape().defaultPolygon);
console.log(polygon.build(polygonResult));

