import { TestBed } from '@angular/core/testing';

import { RecordsService } from './records.service';

describe('RecordsService', () => {
    let recordsService: RecordsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RecordsService],
        });
        recordsService = TestBed.get(RecordsService);
    });

    describe('getRecords$', () => {
        it('should return Observable<Records>', () => {
            recordsService.getRecords$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
