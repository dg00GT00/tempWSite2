import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ICarouselContext} from './photo-carousel.types';

@Directive({
    selector: '[appCarouselPhoto]'
})
export class PhotoCarouselDirective implements OnInit {
    @Input('appCarouselPhoto') images: string[];
    private context: ICarouselContext;
    private index = 0;

    constructor(private templateRef: TemplateRef<ICarouselContext>,
                private viewContainerRef: ViewContainerRef,
    ) {
    }

    ngOnInit(): void {
        this.context = {
            $implicit: this.images[0],
            controller: {
                nextPhoto: () => this.nextPhoto(),
                prevPhoto: () => this.prevPhoto(),
            }
        };
        this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
    }

    private nextPhoto(): void {
        this.index++;
        if (this.index >= this.images.length) {
            this.index = 0;
        }
        this.context.$implicit = this.images[this.index];
    }

    private prevPhoto(): void {
        this.index--;
        if (this.index < 0) {
            this.index = this.images.length - 1;
        }
        this.context.$implicit = this.images[this.index];
    }
}
