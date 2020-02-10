type TargetObserver = Element | SVGAElement;

type CallBack = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;

interface ResizeObserverEntry {
    readonly borderBoxSize: { blockSize: number, inlineSize: number };
    readonly contentBoxSize: { blockSize: number, inlineSize: number };
    contentRect: DOMRectReadOnly;
    target: TargetObserver;
}

declare class ResizeObserver {
    constructor(callback: CallBack);

    observe(element: TargetObserver, options?: { box: 'content-box' | 'border-box' }): void;

    unobserve(element: TargetObserver): void;

    disconnect(): void;
}

