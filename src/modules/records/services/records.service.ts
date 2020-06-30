import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class RecordsService {
    constructor() {}

    getRecords$(): Observable<{}> {
        return of({});
    }
}
