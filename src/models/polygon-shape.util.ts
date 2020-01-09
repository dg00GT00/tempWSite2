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
