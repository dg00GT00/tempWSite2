import {ElementRef, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolygonService {
    setDirective: boolean;
    resizeSub = new Subject();
    private resizeObserver: any;
    private el: ElementRef;

    setElement(el: ElementRef) {
        this.el = el;
        // @ts-ignore
        this.resizeObserver = new ResizeObserver((entries: any[]) => {
            for (const entry of entries) {
                this.resizeSub.next(entry);
            }
        });
        this.resizeObserver.observe(this.el.nativeElement);
    }

    obsDisposable() {
        this.resizeObserver.unobserve(this.el.nativeElement);
        this.resizeSub.unsubscribe();
    }
}
