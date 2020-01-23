import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PolygonDynClipService} from './polygon-helpers-services/polygon-dyn-clip.service';

@Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolygonComponent implements AfterViewInit {
    polygonStyle: any = {};

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private polygonDynClipService: PolygonDynClipService,
    ) {
    }

    ngAfterViewInit(): void {
        this.setPolyStyle(this.polygonDynClipService.buildPolygon());
    }

    resetPolyStyle(clipPath: string): void {
        this.setPolyStyle(clipPath);
        this.changeDetectorRef.detectChanges();
    }

    private setPolyStyle(clipPath: string): void {
        this.polygonStyle = {
            height: '100%',
            width: '100%',
            clipPath
        };
    }
}
