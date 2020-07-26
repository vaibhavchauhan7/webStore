import {TestBed} from '@angular/core/testing';

import {CommonControllerService} from './common-controller.service';

describe('CommonControllerService', () => {
    let service: CommonControllerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CommonControllerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
