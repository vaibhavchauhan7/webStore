import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {Product} from '../../shared/entity/product.model';
import {ProductManagementService} from './product-management.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product[]> {

    constructor(private productManagementService: ProductManagementService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
        return this.productManagementService.getProducts();
    }
}
