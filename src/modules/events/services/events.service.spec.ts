import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';

describe('EventsService', () => {
    let eventsService: EventsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EventsService],
        });
        eventsService = TestBed.get(EventsService);
    });

    describe('getEvents$', () => {
        it('should return Observable<Events>', () => {
            eventsService.getEvents$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
