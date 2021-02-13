import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {ProductResolverService} from './product-resolver.service';

describe('ProductResolverService', () => {
    let service: ProductResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(ProductResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
