import {Component, HostListener, OnInit} from '@angular/core';
import {PolygonAngleService} from '../polygon-clippath/polygon-helpers-services/polygon-angle/polygon-angle.service';

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit {

    constructor(private polygonAngleService: PolygonAngleService) {
    }

    ngOnInit() {
        this.polygonAngleService.getAngleById('Right').subscribe((angle: number) => {
            console.log(angle);
        });
    }
}
