import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {PolygonDynCropService} from './polygon-helpers-services/polygon-dyn-crop.service';
import {IPolygonConfig} from '../../models/polygon-shape.types';
import {PolygonCalcCropService} from './polygon-helpers-services/polygon-calc-crop.service';
import {PolygonComponent} from './polygon.component';

@Directive({
    selector: '[appPolygonConfig]',
    providers: [
        {provide: PolygonDynCropService, useClass: PolygonDynCropService},
        {provide: PolygonCalcCropService, useClass: PolygonCalcCropService},
    ]
})
export class PolygonConfigDirective implements OnInit {
    @Input() resizeCropWidth: number;
    @Input('appPolygonConfig') resizeConfig: IPolygonConfig = {};

    constructor(
        private el: ElementRef,
        private polygonDynCropService: PolygonDynCropService,
        private polygonCalcCropService: PolygonCalcCropService,
        private polygonComponent: PolygonComponent
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

    @HostListener('resize-observer')
    onResize() {
        if (this.resizeCropWidth) {
            this.dynPolygonConfig();
            this.polygonComponent.resetPolyStyle(this.polygonDynCropService.buildPolygon());
        }
    }
}
