export interface IPoint {
    x: number;
    y: number;
}

export interface IPolygonPoints {
    firstPoint: IPoint;
    secondPoint: IPoint;
    thirdPoint: IPoint;
    fourthPoint: IPoint;
}

export interface IConfigSides {
    degAngle: number;
    clipCorner: ClipCorner;
}

/*
// The following enums need to have identical keys and values names
// for making the a proper type cast at future use of them
*/
export enum ClipCorner {
    Down = 'Down',
    Up = 'Up'
}

export enum ClipSide {
    Left = 'Left',
    Right = 'Right',
}

/****************************************************************************/

export type CLipRightSide = Omit<IPolygonPoints, 'firstPoint' | 'fourthPoint'>;
export type ClipLeftSide = Omit<IPolygonPoints, 'secondPoint' | 'thirdPoint'>;

export type ClipSidePairs = CLipRightSide | ClipLeftSide;

type InnerConfig = Record<keyof Omit<IConfigSides, 'degAngle'>, keyof typeof ClipCorner>;
type RecordConfig<T> = Record<keyof typeof ClipSide, T>;

export type PolygonConfig<T = InnerConfig & { degAngle: number }> = Partial<RecordConfig<T> & { Both: RecordConfig<T> }>;

export type AngleConfig = PolygonConfig<IPolygonPoints>;

