import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-records-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
