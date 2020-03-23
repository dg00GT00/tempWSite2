import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {PolygonAngleService} from '../../polygon-clippath/polygon-helpers-services/polygon-angle/polygon-angle.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'lazy-photo-carousel',
    template: `
        <photo-stripe class="photo-stripe_0"></photo-stripe>
        <photo-carousel></photo-carousel>
        <photo-stripe class="photo-stripe_1"></photo-stripe>
    `,
    styleUrls: ['./lazy-photo-carousel.component.scss'],
})
export class LazyPhotoCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
    private angleSubscription: Subscription;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private polygonAngleService: PolygonAngleService,
    ) {
    }

    ngOnInit(): void {
        // Made a closure with the view of adjust the value of dyValue variable inside the closure at the first run
        // of the angle service
        const closure = this.extractedManager();
        this.angleSubscription = this.polygonAngleService.getAngleById('left-clip').subscribe((degAngle: number) => {
            closure(degAngle);
        });
    }

    private extractedManager() {
        let flag: boolean;
        const self = this;
        return function innerFunction(degAngle: number) {
            // The gotten angle should be divided for a tax to keep the right inclination
            let dynValue = degAngle / 1.85;
            // The first run of this inner function need increase the value of dynValue variable
            dynValue = flag ? dynValue : dynValue + 2;
            const htmlElement: HTMLElement[] = self.elementRef.nativeElement.children;
            const value = `rotate(${-dynValue}deg) scale(1, 1.009) skewY(${dynValue}deg`;
            for (const elem of htmlElement) {
                if (RegExp(/\d/).test(elem.className)) {
                    self.renderer.setStyle(elem, 'transform', value);
                    elem.childNodes.forEach(childNode => {
                        // Is needed skip a comment element that comes from ngFor directive
                        if (!RegExp(/comment/).test(childNode.nodeName)) {
                            self.renderer.setStyle(childNode, 'transform', `skewY(${-dynValue}deg)`);
                        }
                    });
                } else {
                    self.renderer.setStyle(elem, 'transform', `rotate(${-dynValue}deg)`);
                }
            }
            flag = true;
        };
    }

    ngAfterViewInit(): void {
        // When this lazy load component is loaded, the prior subscriber is not set by default, then
        // is needed trigger manually a next method on the Subject so that the previous angle value is displayed
        this.polygonAngleService.subAngle.next('left-clip');
    }

    ngOnDestroy(): void {
        this.angleSubscription.unsubscribe();
    }
}
