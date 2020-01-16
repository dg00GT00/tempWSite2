import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IPolygonConfig} from '../../models/polygon-shape.types';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit {
    polygonConfigLeft: IPolygonConfig;
    polygonConfigRight: IPolygonConfig;
    degAngle = 20;
    cropWidthRight = 700;
    cropWidthLeft = 140;

    constructor() {
    }

    ngOnInit() {
        this.polygonConfigLeft = {
            Right: {degAngle: this.degAngle, clipCorner: 'Up'},
        };
        this.polygonConfigRight = {
            Left: {degAngle: 87, clipCorner: 'Down'}
        };
    }
}
