import {Injectable} from '@angular/core';
import {EventManager} from '@angular/platform-browser';

@Injectable()
export class ResizeObserverEventService {
    private manager: EventManager;

    supports(eventName: string): boolean {
        return /resize-observer/.test(eventName);
    }

    addEventListener(element: HTMLElement, eventName: string, handler: (event: any) => void): () => void {
        let resizeObserver: any;
        this.manager.getZone().runOutsideAngular(() => {
            const entryRepass = entry => handler(entry);
            // @ts-ignore
            resizeObserver = new ResizeObserver((entries: any[]) => {
                for (const entry of entries) {
                    entryRepass(entry);
                }
            }).observe(element);
        });
        return () => {
            resizeObserver.unobserve(element);
        };
    }
}
