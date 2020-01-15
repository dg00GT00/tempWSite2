import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {PolygonDynCropService} from './polygon-dyn-crop.service';
import {IResizeDirectiveConfig} from '../../models/polygon-shape.types';
import {PolygonCalcCropService} from './polygon-calc-crop.service';

@Directive({
    selector: '[appPolygonConfig]',
})
export class PolygonConfigDirective implements OnInit {
    @Input() resizeCropWidth: number;
    @Input('appPolygonConfig') resizeConfig: IResizeDirectiveConfig = {};

    constructor(
        private el: ElementRef,
        private polygonDynCropService: PolygonDynCropService,
        private polygonCalcCropService: PolygonCalcCropService,
    ) {
    }

    ngOnInit(): void {
        this.polygonCalcCropService.setCropWidth(this.resizeCropWidth);
        this.dynPolygonConfig();
    }

    private dynPolygonConfig() {
        this.polygonCalcCropService.setDynConfig(this.el.nativeElement.offsetWidth);
        this.polygonDynCropService.setCropConfig(this.resizeConfig);
    }

    @HostListener('resize-observer', ['$event'])
    onResize($event: any) {
        if (this.resizeCropWidth) {
            this.dynPolygonConfig();
        }
    }
}
