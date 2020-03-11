export interface ICarouselContext {
    $implicit: string;
    controller: {
        nextPhoto: () => void,
        prevPhoto: () => void,
    };
}
