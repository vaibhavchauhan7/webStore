import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {CommonControllerService} from '../../shared/services/common-controller.service';
import {ProductManagementService} from '../../product/services/product-management.service';
import {WebStoreRouting} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

    isCustomerAuthenticated: boolean;

    constructor(private commonControllerService: CommonControllerService,
                private productManagementService: ProductManagementService,
                private router: Router) {
        this.getCustomerAuthenticationObserver();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isCustomerLoggedIn(state.url);
    }

    getCustomerAuthenticationObserver(): void {
        this.commonControllerService.getCustomerAuthenticationObserver().subscribe((data: boolean) => {
            this.isCustomerAuthenticated = data;
        });
    }

    isCustomerLoggedIn(url: string): boolean {
        if (this.isCustomerAuthenticated) {
            return true;
        }
        this.productManagementService.previousRoute = url;
        this.router.navigateByUrl(`${WebStoreRouting.LOGIN}`).then();
        return false;
    }
}
