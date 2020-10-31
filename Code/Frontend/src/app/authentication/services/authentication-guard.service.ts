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

    constructor(private commonControllerService: CommonControllerService,
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
        // TODO: Maybe I don't need 'redirectUrl'. It is replaced by 'previousRoute' at various places.
        this.commonControllerService.redirectUrl = url;
        this.router.navigateByUrl(`${WebStoreRouting.LOGIN}`).then();

        return false;
    }
}
