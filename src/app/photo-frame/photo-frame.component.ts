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
        this.polygonAngleService.getAngleById('left-clip').subscribe((degAngle: number) => {
            // The gotten angle should be divided for a tax to keep the right inclination
            // on the component that bas being observable
            this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${-degAngle / 1.85}deg)`);
        });
    }
}
