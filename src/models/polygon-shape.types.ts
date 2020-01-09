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

export enum ClipCorner {
    Down = 'DOWN',
    Up = 'UP'
}

export enum ClipSide {
    Left = 'LEFT',
    Right = 'RIGHT',
}

export type CLipRightSide = Omit<IPolygonPoints, 'firstPoint' | 'fourthPoint'>;
export type ClipLeftSide = Omit<IPolygonPoints, 'secondPoint' | 'thirdPoint'>;
export type ClipSidePairs = CLipRightSide | ClipLeftSide;
