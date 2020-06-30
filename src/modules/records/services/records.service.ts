import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { Post } from '@modules/blog/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResultsRecordGrouped, ResultsRecordUSPA } from '../../../typings';
import * as stateAbbr from '../models/state-abbr.model';

@Injectable()
export class RecordsService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router
    ) {}

    groupRecords(records: ResultsRecordUSPA[]): Array<ResultsRecordGrouped> {
        const ret: Array<ResultsRecordGrouped> = [];

        const rLen = records.length;

        if (rLen === 0) {
            return [
                {
                    record: 'No Records To Display',
                    records: [],
                },
            ];
        }

        for (let r = 0; r < rLen; r++) {
            const rI = ret.findIndex(rec => rec.record === records[r].record);
            if (rI > -1) {
                ret[rI].records.push(records[r]);
            } else {
                ret.push({ record: records[r].record, records: [records[r]] });
            }
        }
        return ret;
    }

    getRecords$(): Observable<ResultsRecordUSPA[]> {
        return this.http
            .get<ResultsRecordUSPA[]>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/records/state/national`
            )
            .pipe(
                map(records =>
                    (records as ResultsRecordUSPA[]).map(record => {
                        return record;
                    })
                )
            );
    }

    getRecordsByState$(abbr: string): Observable<ResultsRecordUSPA[]> {
        let fullState = 'national';
        const sLen = stateAbbr.stateAbbrList.length;
        for (let i = 0; i < sLen; i++) {
            if (stateAbbr.stateAbbrList[i].abbr.toLocaleLowerCase() === abbr.toLocaleLowerCase()) {
                fullState = stateAbbr.stateAbbrList[i].name;
            }
        }

        return this.http
            .get<ResultsRecordUSPA[]>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/records/state/${fullState}`
            )
            .pipe(
                map(records =>
                    (records as ResultsRecordUSPA[]).map(record => {
                        return record;
                    })
                )
            );
    }
}
