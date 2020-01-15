import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {PolygonShape} from '../../models/polygon-shape.model';
import {ClipCorner} from '../../models/polygon-shape.types';
import {PolygonDynCropService} from './polygon-dyn-crop.service';

@Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    styleUrls: ['./polygon.component.scss'],
    providers: [PolygonDynCropService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolygonComponent implements OnInit {
    polygonStyle: any = {};
    polygonInitStyle: any = {};

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private polygonDynCropService: PolygonDynCropService,
    ) {
    }

    ngOnInit(): void {
        const finalResult = this.polygonDynCropService.buildPolygon();

        this.polygonStyle = {
            height: '100%',
            width: '100%',
            clipPath: finalResult
        };
        this.polygonInitStyle = {...this.polygonStyle};
    }

    @HostListener('resize-observer', ['$event'])
    onResize($event: any) {
        if (this.polygonDynCropService.isDynamic) {
            if ($event.contentRect.width < 1400) {
                this.polygonStyle = {
                    ...this.polygonInitStyle,
                    clipPath: PolygonShape.build(PolygonShape.getDefaultPolygon())
                };
            } else {
                this.polygonStyle = this.polygonInitStyle;
            }
            this.changeDetectorRef.detectChanges();
        }
    }
}
