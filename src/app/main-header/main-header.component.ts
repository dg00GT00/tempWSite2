import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PolygonConfig} from '../polygon-clippath/models/polygon-shape.types';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit {
    polygonConfigLeft: PolygonConfig;
    polygonConfigRight: PolygonConfig;
    cropWidthRight = 700;
    cropWidthLeft = 162.5;

    ngOnInit(): void {
        this.polygonConfigLeft = {
            Right: {degAngle: 18.4, clipCorner: 'Up'},
        };
        this.polygonConfigRight = {
            Left: {degAngle: 81, clipCorner: 'Down'}
        };
    }
}
