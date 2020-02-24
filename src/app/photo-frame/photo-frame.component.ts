import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EmbeddedViewRef,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {PolygonAngleService} from '../polygon-clippath/polygon-helpers-services/polygon-angle/polygon-angle.service';

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements AfterViewInit {
    @ViewChild('vc', {read: ViewContainerRef}) containerRef: ViewContainerRef;
    @ViewChildren(TemplateRef) stripesRef: QueryList<TemplateRef<null>>;
    stripes = [...Array(2).keys()];
    private viewRefArray: EmbeddedViewRef<null> [] = [];
    private correctionTax = 1.85;

    constructor(private polygonAngleService: PolygonAngleService,
                private changeDetectorRef: ChangeDetectorRef,
                private renderer: Renderer2,
    ) {
    }

    ngAfterViewInit(): void {
        this.stripesRef.forEach((stripeRef, index) => {
            if (index >= 1) {
                this.viewRefArray.push(this.containerRef.createEmbeddedView(stripeRef));
            }
        });
        const lastViewRef = [...this.viewRefArray].pop();
        const mainPhotoIndex = this.containerRef.indexOf(lastViewRef);
        this.containerRef.detach(mainPhotoIndex);
        this.containerRef.insert(lastViewRef, 1);
        this.viewRefArray.forEach(viewRef => {
            // The gotten angle should be divided for a tax to keep the right inclination
            // on the component that bas being observable
            this.polygonAngleService.getAngleById('left-clip').subscribe((degAngle: number) => {
                // Got the first and only node on the rootNodes array
                this.renderer.setStyle(viewRef.rootNodes[0], 'transform', `rotate(${-degAngle / this.correctionTax}deg)`);
            });
        });
        this.changeDetectorRef.detectChanges();
    }
}
