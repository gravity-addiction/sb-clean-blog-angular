import { TestBed } from '@angular/core/testing';

import { EventsGuard } from './events.guard';

describe('_Template Module Guards', () => {
    let eventsGuard: EventsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [EventsGuard],
        });
        eventsGuard = TestBed.get(EventsGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            eventsGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
