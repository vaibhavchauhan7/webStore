import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AccountComponent} from './account.component';
import {AccountService} from './account.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AccountService', () => {
    let service: AccountService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                AccountComponent
            ]
        }).compileComponents();
        service = TestBed.inject(AccountService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
