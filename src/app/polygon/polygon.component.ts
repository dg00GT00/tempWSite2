import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, SkipSelf} from '@angular/core';
import {PolygonShape} from '../../models/polygon-shape.model';
import {PolygonDynCropService} from './polygon-dyn-crop.service';
import {PolygonCreationService} from './polygon-creation.service';

@Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    styleUrls: ['./polygon.component.scss'],
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
        const dynWidth = this.polygonDynCropService.isDynamic;
        if (dynWidth) {
            if ($event.contentRect.width < dynWidth) {
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
