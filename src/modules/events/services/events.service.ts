import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class EventsService {
    constructor() {}

    getEvents$(): Observable<{}> {
        return of({});
    }

}
