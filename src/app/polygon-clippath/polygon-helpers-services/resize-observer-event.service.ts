import {Injectable} from '@angular/core';
import {EventManager} from '@angular/platform-browser';

@Injectable()
export class ResizeObserverEventService {
    private manager: EventManager;

    supports(eventName: string): boolean {
        return /resize-observer/.test(eventName);
    }

    addEventListener(element: HTMLElement, eventName: string, handler: (event: ResizeObserverEntry) => void): () => void {
        let resizeObserver: ResizeObserver;
        this.manager.getZone().runOutsideAngular(() => {
            const entryPass = (entry: ResizeObserverEntry) => handler(entry);
            resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                for (const entry of entries) {
                    entryPass(entry);
                }
            });
            resizeObserver.observe(element);
        });
        return () => {
            resizeObserver.unobserve(element);
        };
    }
}
