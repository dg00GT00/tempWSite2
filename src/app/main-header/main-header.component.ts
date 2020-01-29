import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {IPolygonConfig} from '../../models/polygon-shape.types';
import {PolygonAngleService} from '../polygon-clippath/polygon-helpers-services/polygon-angle/polygon-angle.service';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit {
    polygonConfigLeft: IPolygonConfig;
    polygonConfigRight: IPolygonConfig;
    private degAngle = 20;
    cropWidthRight = 700;
    cropWidthLeft = 140;

    constructor(private polygonAngleService: PolygonAngleService) {
    }

    ngOnInit(): void {
        this.polygonConfigLeft = {
            Right: {degAngle: this.degAngle, clipCorner: 'Up'},
        };
        this.polygonConfigRight = {
            Left: {degAngle: 87, clipCorner: 'Down'}
        };
    }

    @HostListener('resize-observer')
    onResize() {
        console.log(this.polygonAngleService.getAngleById('Right'));
    }
}
