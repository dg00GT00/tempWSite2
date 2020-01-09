import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ClipPathConfig, PolygonShape} from '../../models/polygon-shape.model';
import {ClipCorner, ClipSide} from '../../models/polygon-shape.types';
import {PolygonService} from './polygon.service';

@Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    styleUrls: ['./polygon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolygonComponent implements OnInit, AfterViewInit, OnDestroy {
    polygonStyle: any = {};
    @ViewChild('polygon', {static: true}) polygon: ElementRef;
    constructor(private changeDetectorRef: ChangeDetectorRef, private polygonService: PolygonService) {
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

        if (this.polygonService.setDirective) {
            this.polygonService.setElement(this.polygon);
        }
    }

    ngAfterViewInit(): void {
        const modifiedStyle = {...this.polygonStyle};
        this.polygonService.resizeSub.subscribe((entry: any) => {
            console.log(entry.target.parentNode.className, entry.contentRect.width);
            if (entry.contentRect.width < 400) {
                this.polygonStyle = {
                    ...modifiedStyle,
                    clipPath: PolygonShape.build(PolygonShape.getDefaultPolygon())
                };
            } else {
                this.polygonStyle = modifiedStyle;
            }
            this.changeDetectorRef.detectChanges();
        });

    }

    ngOnDestroy(): void {
        this.polygonService.obsDisposable();
    }

}
