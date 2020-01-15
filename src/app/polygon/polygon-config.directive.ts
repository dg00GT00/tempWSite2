import {Directive, ElementRef, Input, OnInit, Self} from '@angular/core';
import {PolygonDynCropService} from './polygon-dyn-crop.service';
import {IResizeDirectiveConfig} from '../../models/polygon-shape.types';
import {PolygonCreationService} from './polygon-creation.service';

@Directive({
    selector: '[appPolygonConfig]',
    providers: [{
        provide: PolygonDynCropService,
        deps: [PolygonCreationService],
        useClass: PolygonDynCropService
    }]
})
export class PolygonConfigDirective implements OnInit {
    @Input() resizeCropWidth: number;
    @Input('appPolygonConfig') resizeConfig: IResizeDirectiveConfig = {};

    constructor(
        private el: ElementRef,
        private polygonDynCropService: PolygonDynCropService
    ) {
    }

    ngOnInit(): void {
        this.polygonDynCropService.setDynConfig(this.el.nativeElement.offsetWidth, this.resizeCropWidth);
        this.polygonDynCropService.setCropConfig(this.resizeConfig);
    }
}
