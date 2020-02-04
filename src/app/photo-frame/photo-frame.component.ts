import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PolygonAngleService} from '../polygon-clippath/polygon-helpers-services/polygon-angle/polygon-angle.service';

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit {
    @ViewChild('rotate', {static: true}) el: ElementRef;
    angleTax = .001;

    constructor(private polygonAngleService: PolygonAngleService,
                private renderer: Renderer2,
    ) {
    }

    ngOnInit() {
        // this.renderer.setStyle(this.el.nativeElement, 'transform-origin', 'left bottom');
        const angle = this.helperAngle(.000353);
        this.polygonAngleService.getAngleById('left-clip').subscribe((radAngle: number) => {
            // radAngle *= this.angleTax;
            const angleResult = angle(radAngle);
            this.renderer.setStyle(this.el.nativeElement, 'transform', `rotate(${-angleResult}rad)`);
            console.log(angleResult);
            // this.angleTax += .000353;
        });
    }

    private helperAngle(increaseFactor: number): (radAngle: number) => number {
        let oldAngle = 0;
        let returnAngle = 0;

        function innerFunc(radAngle: number): number {
            if (radAngle > oldAngle) {
                oldAngle = radAngle;
                radAngle *= this.angleTax;
                this.angleTax += increaseFactor;
                returnAngle = radAngle;
                return radAngle;
            }
            if (radAngle < oldAngle) {
                oldAngle = radAngle;
                this.angleTax -= increaseFactor;
                radAngle *= this.angleTax;
                returnAngle = radAngle;
                return radAngle;
            }
            return returnAngle;
        }

        return innerFunc.bind(this);
    }

}
