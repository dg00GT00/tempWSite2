import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PolygonDynCropService} from './polygon-dyn-crop.service';

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
        this.polygonDynCropService.finalPolygon.subscribe(polygon => {
                this.polygonStyle = {
                    height: '100%',
                    width: '100%',
                    clipPath: this.polygonDynCropService.buildPolygon(polygon)
                };
                this.changeDetectorRef.detectChanges();
            }
        );
    }
}
