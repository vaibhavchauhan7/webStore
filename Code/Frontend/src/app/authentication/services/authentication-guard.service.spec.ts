import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {AuthenticationGuardService} from './authentication-guard.service';

describe('AuthenticationGuardService', () => {
    let service: AuthenticationGuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(AuthenticationGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
