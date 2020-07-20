import { Location } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RecordsService } from '@modules/records/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ResultsRecordGrouped, ResultsRecordUSPA } from '../../../../typings';

@Component({
    selector: 'sb-records-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    @ViewChildren('recordSubclass') subclassDiv!: QueryList<ElementRef>;
    @ViewChild('pageTop') pageTop!: ElementRef;

    recordState = '';
    loadingState = false;

    records$!: Observable<ResultsRecordGrouped[]>;
    // records$!: Observable<ResultsRecordUSPA[]>;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private recordsService: RecordsService,
        private spinner: NgxSpinnerService
    ) {}
    ngOnInit() {
        this.spinner.show();

        this.records$ = this.route.paramMap.pipe(
            tap((params: ParamMap) => (this.recordState = params.get('state') as string)),
            switchMap((params: ParamMap) =>
                this.recordsService.getRecordsByState$(
                    (params.get('state') as string) || 'national'
                )
            ),
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
        if (this.recordState === 'us-map') {
            this.recordState = 'national';
            this.location.replaceState('/r');
        } else {
            this.location.replaceState('/r/' + this.recordState);
        }

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

    scrollToTop() {
        this.pageTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToSubclass(subclass: number) {
        this.subclassDiv.toArray()[subclass].nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
}
