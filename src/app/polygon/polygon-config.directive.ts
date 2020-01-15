import {Directive, ElementRef, Input} from '@angular/core';
import {PolygonDynCropService} from './polygon-dyn-crop.service';
import {IResizeDirectiveConfig} from '../../models/polygon-shape.types';

@Directive(
    {selector: '[appPolygonConfig]'}
)
export class PolygonConfigDirective {
    @Input() resizeCropWidth: number;
    @Input('appPolygonConfig') resizeConfig: IResizeDirectiveConfig = {};

    constructor(
        private el: ElementRef,
        private polygonDynCropService: PolygonDynCropService
    ) {
        this.polygonDynCropService.setDynConfig(this.el.nativeElement.offsetWidth, this.resizeCropWidth);
        this.polygonDynCropService.setCropConfig(this.resizeConfig);
    }
}
