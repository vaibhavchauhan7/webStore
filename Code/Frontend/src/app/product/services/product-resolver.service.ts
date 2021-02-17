import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {Product} from '../../shared/entity/models';
import {ProductService} from './product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product[]> {

    constructor(private productService: ProductService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
        return this.productService.getProducts();
    }
}
