import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {PolygonShape} from '../../models/polygon-shape.model';
import {ClipCorner} from '../../models/polygon-shape.types';
import {PolygonHelperService} from './polygon-helper.service';
import {PolygonCreationService} from './polygon-creation.service';

@Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    styleUrls: ['./polygon.component.scss'],
    providers: [PolygonHelperService, PolygonCreationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolygonComponent implements OnInit {
    polygonStyle: any = {};
    polygonInitStyle: any = {};

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private polygonHelperService: PolygonHelperService,
        private polygonCreationService: PolygonCreationService) {
    }

    ngOnInit(): void {
        this.polygonCreationService.setBothSides(
            {degAngle: 10, clipCorner: ClipCorner.Up},
            {degAngle: 25, clipCorner: ClipCorner.Down}
        );
        const finalResult = this.polygonCreationService.build();

        this.polygonStyle = {
            height: '100%',
            width: '100%',
            clipPath: finalResult
        };
        this.polygonInitStyle = {...this.polygonStyle};
    }

    @HostListener('resize-observer', ['$event'])
    onResize($event: any) {
        if (this.polygonHelperService.isSetDirective) {
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
