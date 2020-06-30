import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecordsService } from '@modules/records/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResultsRecordGrouped, ResultsRecordUSPA } from '../../../../typings';

@Component({
    selector: 'sb-records-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    recordState = '';
    loadingState = false;

    records$!: Observable<ResultsRecordGrouped[]>;
    // records$!: Observable<ResultsRecordUSPA[]>;

    constructor(private recordsService: RecordsService, private spinner: NgxSpinnerService) {}
    ngOnInit() {
        this.spinner.show();
        this.records$ = this.recordsService.getRecords$().pipe(
            tap((response: ResultsRecordUSPA[]) => {
                this.spinner.hide();
            }),
            map((response: ResultsRecordUSPA[]): ResultsRecordGrouped[] =>
                this.recordsService.groupRecords(response)
            )
        );
    }

    stateClicked(event: Event) {
        const target: HTMLElement | null =
            (event.target as HTMLElement) || (event.currentTarget as HTMLElement);
        const idAttr: Attr | null = target.attributes.getNamedItem('id');
        this.recordState = idAttr ? (idAttr.nodeValue ? idAttr.nodeValue : '') : '';
        this.spinner.show();
        this.records$ = this.recordsService.getRecordsByState$(this.recordState).pipe(
            tap((response: ResultsRecordUSPA[]) => {
                this.spinner.hide();
            }),
            map((response: ResultsRecordUSPA[]): ResultsRecordGrouped[] =>
                this.recordsService.groupRecords(response)
            )
        );
    }
}
