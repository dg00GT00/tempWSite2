import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {ClipPathConfig, PolygonShape} from '../../models/polygon-shape.model';
import {ClipCorner, ClipSide} from '../../models/polygon-shape.types';
import {PolygonHelperService} from './polygon-helper.service';

@Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    styleUrls: ['./polygon.component.scss'],
    providers: [PolygonHelperService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolygonComponent implements OnInit {
    polygonStyle: any = {};
    polygonInitStyle: any = {};
    constructor(private changeDetectorRef: ChangeDetectorRef, private polygonHelperService: PolygonHelperService) {
    }

    ngOnInit(): void {
        const config1 = new ClipPathConfig(15);
        const clipPath1 = config1.clipConfig(ClipSide.Left, ClipCorner.Up);
        const polygonResult1 = config1.polygonArithmetic(clipPath1);

        const config2 = new ClipPathConfig(10);
        const clipPath2 = config2.clipConfig(ClipSide.Right, ClipCorner.Down);

        const polygonResult2 = config2.polygonArithmetic(clipPath2);

        const concatResult = PolygonShape.concatPolygons(polygonResult1, polygonResult2);

        const finalResult = PolygonShape.build(concatResult);

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
