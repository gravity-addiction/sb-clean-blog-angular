import { TestBed } from '@angular/core/testing';

import { ProfilesGuard } from './profiles.guard';

describe('_Template Module Guards', () => {
    let profilesGuard: ProfilesGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ProfilesGuard],
        });
        profilesGuard = TestBed.get(ProfilesGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            profilesGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
