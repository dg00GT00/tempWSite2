import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PolygonConfig} from '../../models/polygon-shape.types';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit {
    polygonConfigLeft: PolygonConfig;
    polygonConfigRight: PolygonConfig;
    private degAngle = 20;
    cropWidthRight = 700;
    cropWidthLeft = 140;

    ngOnInit(): void {
        this.polygonConfigLeft = {
            Right: {degAngle: this.degAngle, clipCorner: 'Up'},
        };
        this.polygonConfigRight = {
            Left: {degAngle: 87, clipCorner: 'Down'}
        };
    }
}
