import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {CommonControllerService} from '../../shared/services/common-controller.service';
import {WebStoreRouting} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

    isCustomerAuthenticated: boolean;

    constructor(private router: Router,
                private commonControllerService: CommonControllerService) {
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
        this.commonControllerService.redirectUrl = url;
        this.router.navigateByUrl(`${WebStoreRouting.LOGIN}`);

        return false;
    }
}
