import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PolygonAngleService} from '../polygon-clippath/polygon-helpers-services/polygon-angle/polygon-angle.service';

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit {
    @ViewChild('rotate', {static: true}) el: ElementRef;

    constructor(private polygonAngleService: PolygonAngleService,
                private renderer: Renderer2,
    ) {
    }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'transform-origin', 'left bottom');
        this.polygonAngleService.getAngleById('Left').subscribe((radAngle: number) => {
        this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${radAngle}rad)`);
    });
    }

}
