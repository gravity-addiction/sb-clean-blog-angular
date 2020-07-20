import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfileService } from '@modules/profiles/services';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'sb-find-profile-input',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './find-profile-input.component.html',
    styleUrls: ['find-profile-input.component.scss'],
})
export class FindProfileInputComponent implements OnInit, OnDestroy {
    queryField: FormControl = new FormControl();
    query!: Observable<any>;
    query$!: Subscription;

    constructor(public profileService: ProfileService) {}
    ngOnInit() {
        this.profileService.profileSearch$ = this.queryField.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(q => this.profileService.searchProfile$(q))
        );
        /*
            .debounceTime(200)
            .distinctUntilChanged()
            .switchMap(query => this._searchService.search(query));
*/
        this.query$ = this.profileService.profileSearch$.subscribe(q => {
            console.log('CB', q);
        });
    }

    ngOnDestroy() {
        try {
            this.query$.unsubscribe();
        } catch (e) {}
    }
}
