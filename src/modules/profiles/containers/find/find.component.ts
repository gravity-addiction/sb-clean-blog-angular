import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProfileService } from '@modules/profiles/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'sb-find',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './find.component.html',
    styleUrls: ['find.component.scss'],
})
export class FindComponent implements OnInit {
    constructor(public profileService: ProfileService, private spinner: NgxSpinnerService) {}
    ngOnInit() {}
}
