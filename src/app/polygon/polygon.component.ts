import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {PolygonDynCropService} from './polygon-helpers-services/polygon-dyn-crop.service';

@Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    styleUrls: ['./polygon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolygonComponent implements AfterViewInit {
    polygonStyle: any = {};

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private polygonDynCropService: PolygonDynCropService,
    ) {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.setPolyStyle(this.polygonDynCropService.buildPolygon());
        }, 0);
    }

    resetPolyStyle(clipPath: string) {
        this.setPolyStyle(clipPath);
        this.changeDetectorRef.detectChanges();
    }

    private setPolyStyle(clipPath: string) {
        this.polygonStyle = {
            height: '100%',
            width: '100%',
            clipPath
        };
    }
}
