import {Directive} from '@angular/core';
import {PolygonHelperService} from './polygon-helper.service';

@Directive(
    {selector: '[appResizeObserver]'}
)
export class ResizeObserverDirective {

    constructor(private polygonHelperService: PolygonHelperService) {
        this.polygonHelperService.isSetDirective = true;
    }
}
