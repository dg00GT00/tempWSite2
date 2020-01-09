import {Directive} from '@angular/core';
import {PolygonService} from './polygon.service';

@Directive(
    {selector: '[appResizeObserver]'}
)
export class ResizeObserverDirective {

    constructor(private polygonService: PolygonService) {
        this.polygonService.setDirective = true;
    }
}
