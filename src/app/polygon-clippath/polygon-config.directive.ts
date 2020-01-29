import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {PolygonDynClipService} from './polygon-helpers-services/polygon-dyn-clip.service';
import {IPolygonConfig} from '../../models/polygon-shape.types';
import {PolygonCalcClipService} from './polygon-helpers-services/polygon-calc-clip.service';
import {PolygonComponent} from './polygon.component';
import {PolygonAngleService} from './polygon-helpers-services/polygon-angle/polygon-angle.service';

@Directive({
    selector: '[appPolygonConfig]',
    providers: [PolygonDynClipService, PolygonCalcClipService]
})
export class PolygonConfigDirective implements OnInit, OnDestroy {
    @Input() resizeCropWidth: number;
    @Input('appPolygonConfig') resizeConfig: IPolygonConfig = {};

    constructor(
        private el: ElementRef,
        private polygonDynClipService: PolygonDynClipService,
        private polygonCalcClipService: PolygonCalcClipService,
        private polygonAngleService: PolygonAngleService,
        private polygonComponent: PolygonComponent,
    ) {
    }

    private getPolygonDim(): [number, number] {
        const {offsetWidth, offsetHeight} = this.el.nativeElement;
        return [offsetWidth, offsetHeight];
    }

    // At this function, the order in which the services are called is important
    private dynPolygonConfig(): void {
        const [offsetWidth, offsetHeight] = this.getPolygonDim();
        this.polygonAngleService.setPolygonDim(offsetWidth, offsetHeight);
        this.polygonCalcClipService.setOffsetWidth(offsetWidth);
        this.polygonDynClipService.setClipConfig(this.polygonCalcClipService, this.resizeConfig);
    }

    ngOnInit(): void {
        this.polygonCalcClipService.setClipWidth(this.resizeCropWidth);
        this.polygonAngleService.setIdByPolygon(this.el.nativeElement.id, this.resizeConfig);
        this.dynPolygonConfig();
    }

    // Discards the Map field at PolygonAngleService the component
    // being manage by this directive be destroyed
    ngOnDestroy(): void {
        delete this.polygonAngleService.mapPolygonById;
    }

    @HostListener('resize-observer')
    onResize(): void {
        if (this.resizeCropWidth) {
            this.dynPolygonConfig();
            this.polygonComponent.resetPolyStyle(this.polygonDynClipService.buildPolygon());
        }
    }
}
