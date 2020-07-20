import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthUtilsService } from '@modules/auth/services';
import { ProfileService } from '@modules/profiles/services';
import { RecordsService } from '@modules/records/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Profile } from '../../models/';

@Component({
    selector: 'sb-profile',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './profile.component.html',
    styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    isLoggedIn = false;
    profile$!: Observable<Profile | null>;
    profile!: string;

    constructor(
        private authUtilsService: AuthUtilsService,
        private changeDetectorRef: ChangeDetectorRef,
        private profileService: ProfileService,
        private recordsService: RecordsService,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.spinner.show();

        this.profile$ = this.route.paramMap.pipe(
            tap((params: ParamMap) => {
                return (this.profile = (params.get('profile') as string).replace(' ', '_'));
            }),
            switchMap((params: ParamMap) => this.profileService.getProfile$(this.profile))
        );
        this.subscription.add(
            this.authUtilsService.isLoggedIn$().subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
                this.changeDetectorRef.detectChanges();
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
