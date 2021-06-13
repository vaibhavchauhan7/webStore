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

    isCustomerAuthenticated: boolean;

    constructor(private commonService: CommonService,
                private productService: ProductService,
                private router: Router) {
        this.getCustomerAuthentication();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isCustomerLoggedIn(state.url);
    }

    getCustomerAuthentication(): void {
        this.commonService.getCustomerAuthentication().subscribe((data: boolean) => {
            this.isCustomerAuthenticated = data;
        });
    }

    isCustomerLoggedIn(url: string): boolean {
        if (this.isCustomerAuthenticated) {
            return true;
        }
        this.productService.previousRoute = url;
        this.router.navigateByUrl(`${WSRouting.LOGIN}`).then();
        return false;
    }

}
