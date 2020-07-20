import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { RecordsService } from '@modules/records/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ResultsRecordGrouped, ResultsRecordUSPA } from '../../../../typings';

@Component({
    selector: 'sb-records-profile-a',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './records-profile-a.component.html',
    styleUrls: ['records-profile-a.component.scss'],
})
export class RecordsProfileAComponent implements OnInit {
    @Input() peopleId!: string;
    @ViewChildren('recordSubclass') subclassDiv!: QueryList<ElementRef>;
    @ViewChild('pageTop') pageTop!: ElementRef;

    recordStats$!: Observable<ResultsRecordGrouped[]>;

    constructor(private recordsService: RecordsService, private spinner: NgxSpinnerService) {}
    ngOnInit() {
        this.recordStats$ = this.recordsService.getRecordsByPerson$(this.peopleId).pipe(
            map((response: ResultsRecordUSPA[]): ResultsRecordGrouped[] =>
                this.recordsService.groupRecords(response)
            ),
            tap((response: ResultsRecordGrouped[]) => {
                this.spinner.hide();
            })
        );
    }

    scrollToTop() {
        this.pageTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToSubclass(subclass: number) {
        this.subclassDiv.toArray()[subclass].nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
}
