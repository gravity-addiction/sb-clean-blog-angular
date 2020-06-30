import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-records-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    recordState = '';
    loadingState = false;

    constructor() {}
    ngOnInit() {}

    stateClicked(event: Event) {
        const target: HTMLElement | null =
            (event.target as HTMLElement) || (event.currentTarget as HTMLElement);
        const idAttr: Attr | null = target.attributes.getNamedItem('id');
        this.recordState = idAttr ? (idAttr.nodeValue ? idAttr.nodeValue : '') : '';
    }
}
