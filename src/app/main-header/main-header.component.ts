import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EmbeddedViewRef,
    OnInit,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {PolygonConfig} from '../polygon-clippath/models/polygon-shape.types';
import {PolygonAngleService} from '../polygon-clippath/polygon-helpers-services/polygon-angle/polygon-angle.service';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit, AfterViewInit {
    @ViewChild('vc', {read: ViewContainerRef}) containerRef: ViewContainerRef;
    @ViewChildren(TemplateRef) templatesRef: QueryList<TemplateRef<null>>;
    private viewRefArray: EmbeddedViewRef<null> [] = [];
    private correctionTax = 1.85;
    polygonConfigLeft: PolygonConfig;
    polygonConfigRight: PolygonConfig;
    stripes = [...Array(2).keys()];
    cropWidthRight = 700;
    cropWidthLeft = 162.5;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private polygonAngleService: PolygonAngleService,
        private renderer: Renderer2,
    ) {
    }

    private dynPhotoFrame(viewRef: EmbeddedViewRef<null>) {
        // The gotten angle should be divided for a tax to keep the right inclination
        this.polygonAngleService.getAngleById('left-clip').subscribe((degAngle: number) => {
            // on the component that bas being observable
            // Got the first and only node on the rootNodes array
            const htmlElement: HTMLElement[] = viewRef.rootNodes;
            const dynValue = degAngle / this.correctionTax;
            const value = `rotate(${-dynValue}deg) scale(1, 1.009) skewY(${dynValue}deg`;
            if (RegExp(/[01]/).test(htmlElement[0].className)) {
                this.renderer.setStyle(htmlElement[0], 'transform', value);
                htmlElement[0].childNodes.forEach(childNode => {
                    // Is needed skip a comment element that comes from ng-container
                    if (!RegExp(/comment/).test(childNode.nodeName)) {
                        this.renderer.setStyle(childNode, 'transform', `skewY(${-dynValue}deg)`);
                    }
                });
            } else {
                this.renderer.setStyle(htmlElement[0], 'transform', `rotate(${-dynValue}deg)`);
            }
        });
    }

    ngOnInit(): void {
        this.polygonConfigLeft = {
            Right: {degAngle: 18.4, clipCorner: 'Up'},
        };
        this.polygonConfigRight = {
            Left: {degAngle: 81, clipCorner: 'Down'}
        };
    }

    ngAfterViewInit(): void {
        this.templatesRef.forEach((templateRef, index) => {
            // Is needed skip a comment element that comes from ng-container
            if (index >= 1) {
                this.viewRefArray.push(this.containerRef.createEmbeddedView(templateRef));
            }
        });
        const lastViewRef = [...this.viewRefArray].pop();
        const mainPhotoIndex = this.containerRef.indexOf(lastViewRef);
        this.containerRef.detach(mainPhotoIndex);
        this.containerRef.insert(lastViewRef, 1);
        this.viewRefArray.forEach(viewRef => this.dynPhotoFrame(viewRef));
        this.changeDetectorRef.detectChanges();
    }
}
