import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { Profile } from '@modules/profiles/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResultsProfile } from '../../../typings';

@Injectable()
export class ProfileService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router
    ) {}

    getProfile$(profileSlug: string): Observable<Profile | null> {
        const params = new HttpParams().set('findBy', 'slug');
        return this.http
            .get<ResultsProfile>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/profiles/${profileSlug}`,
                {
                    params,
                }
            )
            .pipe(map(profile => profile as Profile));
    }
}
