import {Component, OnInit} from '@angular/core';
import {IPolygonPoints} from '../../models/polygon-shape.types';

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    getFinalPolygon(finalPolygon: IPolygonPoints) {
        console.log(finalPolygon);

    }
}
