import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {CommonControllerService} from './common-controller.service';

describe('CommonControllerService', () => {
    let service: CommonControllerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(CommonControllerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
