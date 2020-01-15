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

export interface IConfigSides {
    degAngle: number;
    clipCorner: ClipCorner;
}

type InnerConfig = Record<keyof Omit<IConfigSides, 'degAngle'>, keyof typeof ClipCorner>;
type RecordConfig = Record<keyof typeof ClipSide, InnerConfig & {degAngle: number}>;
export type IResizeDirectiveConfig = Partial<RecordConfig & { Both: RecordConfig }>;
