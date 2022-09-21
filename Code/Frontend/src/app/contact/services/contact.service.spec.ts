import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ContactComponent} from '../contact.component';
import {ContactService} from './contact.service';

describe('ContactService', () => {
    let service: ContactService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [ContactComponent]
        });
        service = TestBed.inject(ContactService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
