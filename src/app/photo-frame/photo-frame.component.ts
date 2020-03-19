import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-photo-frame',
    template: `
        <div class="main-photo">
            {{photo}}
        </div>`,
    styles: [`
        .main-photo {
            background-color: green;
            height: 85%;
            width: inherit;
        }`
    ]
})
export class PhotoFrameComponent implements OnInit {
    @Input() photo: string;

    ngOnInit(): void {

    }
}
