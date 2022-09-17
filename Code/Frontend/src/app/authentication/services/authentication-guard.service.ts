import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {CommonService} from '../../shared/services/common.service';
import {ProductService} from '../../product/services/product.service';
import {WSRouting} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

    customerAuthenticated = false;

    constructor(private commonService: CommonService,
                private productService: ProductService,
                private router: Router) {
        this.getCustomerAuthentication();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isCustomerLoggedIn(state.url);
    }

    getCustomerAuthentication(): void {
        this.commonService.getCustomerAuthentication().subscribe({
            next: (data: boolean) => {
                this.customerAuthenticated = data;
            }
        });
    }

    isCustomerLoggedIn(url: string): boolean {
        if (this.customerAuthenticated) {
            return true;
        } else {
            this.productService.previousRoute = url;
            this.router.navigateByUrl(`${WSRouting.LOGIN}`).then();
            return false;
        }
    }

}
