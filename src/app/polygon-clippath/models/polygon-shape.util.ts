import {ClipSide, IPolygonPoints} from './polygon-shape.types';

// Makes a deep copy from a polygon
export function polygonDeepCopy<T>(source: T): T {
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

type ClipFunction<TReturn> = (clipPoints: string[], sidePolygon: IPolygonPoints) => TReturn;

// General function for doing several calculation on the target polygon
// This calculation is manage by the clipFunction pass in as one of parameters
export function dispatchCalculation<TReturn = IPolygonPoints>(sidePolygon: IPolygonPoints,
                                                              clipSide: ClipSide,
                                                              clipFunction: ClipFunction<TReturn>,
                                                              thisArg?: any): TReturn {
    switch (clipSide) {
        case ClipSide.Left:
            return clipFunction.call(thisArg, ['firstPoint', 'fourthPoint'], sidePolygon);
        case ClipSide.Right:
            return clipFunction.call(thisArg, ['secondPoint', 'thirdPoint'], sidePolygon);
    }
}
