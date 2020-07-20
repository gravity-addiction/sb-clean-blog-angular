import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { Profile } from '@modules/profiles/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResultsProfile } from '../../../typings';

@Injectable()
export class ProfileService {
    profileSearch$!: Observable<any | null>;

    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    getProfile$(profileSlug: string): Observable<Profile | null> {
        // const params = new HttpParams().set('findBy', 'slug');

        return this.http
            .get<ResultsProfile>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/profile/${profileSlug}`
            )
            .pipe(map(profile => profile as Profile));
    }

    searchProfile$(keywords: string): Observable<Array<any> | null> {
        const params = new HttpParams().set('keywords', keywords);

        this.spinner.show();

        return this.http
            .get<Array<any>>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/profile/search`,
                {
                    params,
                }
            )
            .pipe(
                map(profile => profile),
                tap(() => {
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 500);
                })
            );
    }
}
