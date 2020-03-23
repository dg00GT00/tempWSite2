import {Compiler, Component, Injector, NgModuleFactory, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {MainPhotoModule} from './main-photo-carousel';

@Component({
    selector: 'app-root',
    template: `
        <app-main-header>
            <ng-container #vc></ng-container>
        </app-main-header>
        <app-main-body></app-main-body>`,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    @ViewChild('vc', {read: ViewContainerRef}) containerRef: ViewContainerRef;

    constructor(private compiler: Compiler,
                private injector: Injector,
    ) {
    }

    async ngOnInit(): Promise<void> {
        await this.loadComponent();
    }

    async loadComponent(): Promise<void> {
        const {LazyPhotoCarouselComponent, MainPhotoModule} =
            await import('./main-photo-carousel');
        const moduleFactory = await this.loadModuleFactory(MainPhotoModule);
        const moduleRef = moduleFactory.create(this.injector);
        const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(LazyPhotoCarouselComponent);
        this.containerRef.createComponent(factory);
    }

    private async loadModuleFactory(moduleFactory: Type<MainPhotoModule>): Promise<NgModuleFactory<MainPhotoModule>> {
        if (moduleFactory instanceof NgModuleFactory) {
            return moduleFactory;
        } else {
            return await this.compiler.compileModuleAsync(moduleFactory);
        }
    }

}
