import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {PolygonDynClipService} from './polygon-helpers-services/polygon-dyn/polygon-dyn-clip.service';
import {PolygonConfig} from './models/polygon-shape.types';
import {PolygonCalcClipService} from './polygon-helpers-services/polygon-calc-clip.service';
import {PolygonComponent} from './polygon.component';
import {PolygonAngleService} from './polygon-helpers-services/polygon-angle/polygon-angle.service';

@Directive({
    selector: '[appPolygonConfig]',
    providers: [PolygonDynClipService, PolygonCalcClipService]
})
export class PolygonConfigDirective implements OnInit, OnDestroy {
    @Input() resizeCropWidth: number;
    @Input('appPolygonConfig') resizeConfig: PolygonConfig = {};

    constructor(
        private el: ElementRef,
        private polygonDynClipService: PolygonDynClipService,
        private polygonCalcClipService: PolygonCalcClipService,
        private polygonAngleService: PolygonAngleService,
        private polygonComponent: PolygonComponent,
    ) {
    }

    // Within this function, the order in which the services are called is important
    private builderPolygonConfig(): void {
        const {offsetWidth, offsetHeight, id} = this.el.nativeElement;
        this.polygonCalcClipService.setOffsetWidth(offsetWidth);
        this.polygonAngleService.setAngleConfig(offsetWidth, offsetHeight);
        this.polygonDynClipService.setClipConfig(this.polygonCalcClipService, this.resizeConfig, id);
    }

    ngOnInit(): void {
        this.polygonCalcClipService.setClipWidth(this.resizeCropWidth);
        this.builderPolygonConfig();
    }

    // Discards the correspond key (id) from map field at PolygonAngleService the component
    ngOnDestroy(): void {
        this.polygonAngleService.mapPolygonById.delete(this.el.nativeElement.id);
    }

    @HostListener('resize-observer')
    onResize(): void {
        if (this.resizeCropWidth) {
            this.builderPolygonConfig();
            this.polygonComponent.resetPolyStyle(this.polygonDynClipService.buildPolygon());
        }
    }
}
