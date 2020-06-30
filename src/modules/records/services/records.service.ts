import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { Post } from '@modules/blog/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResultsRecordGrouped, ResultsRecordUSPA } from '../../../typings';
import * as recordsUSPAModel from '../models/records-uspa.model';
import * as stateAbbr from '../models/state-abbr.model';

@Injectable()
export class RecordsService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router
    ) {}

    compareRecordSubclass(a: ResultsRecordGrouped, b: ResultsRecordGrouped) {
        // Use toUpperCase() to ignore character casing
        const bandA = (a.subclass || '').toUpperCase();
        const bandB = (b.subclass || '').toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    groupRecords(records: ResultsRecordUSPA[]): Array<ResultsRecordGrouped> {
        const ret: Array<ResultsRecordGrouped> = [];

        const rLen = records.length;

        if (rLen === 0) {
            return [
                {
                    subclass: 'No Records To Display',
                    records: [],
                },
            ];
        }

        // Loop all raw records
        for (let r = 0; r < rLen; r++) {
            let rSubclass = records[r].subclass;
            const rSC = recordsUSPAModel.RecordsUSPASubclassList.find(
                s => s.uspa_subclass === records[r].subclass
            );

            if (rSC) {
                rSubclass = rSC.abbr;
            }

            // Find Subclass matching
            const rSI = ret.findIndex(rec => rec.subclass === rSubclass);
            // Has Subclass Match
            if (rSI > -1) {
                // Find Record Match Within Subclass Group
                const rI = ret[rSI].records.findIndex(rec => rec.record === records[r].record);
                // Has Match
                if (rI > -1) {
                    ret[rSI].records[rI].records.push(records[r]);
                    // No Record Match, Create Subclass Group
                } else {
                    ret[rSI].records.push({
                        record: records[r].record,
                        records: [records[r]],
                    });
                }
                // No Subclass Match, Create Entire Group Record
            } else {
                ret.push({
                    subclass: rSubclass,
                    records: [
                        {
                            record: records[r].record,
                            records: [records[r]],
                        },
                    ],
                });
            }
        }
        return ret.sort(this.compareRecordSubclass);
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
