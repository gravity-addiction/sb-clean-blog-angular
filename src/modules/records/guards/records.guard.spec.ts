import { TestBed } from '@angular/core/testing';

import { RecordsGuard } from './records.guard';

describe('_Template Module Guards', () => {
    let recordsGuard: RecordsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [RecordsGuard],
        });
        recordsGuard = TestBed.get(RecordsGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            recordsGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
