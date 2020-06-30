import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-find',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './find.component.html',
    styleUrls: ['find.component.scss'],
})
export class FindComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
