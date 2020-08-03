import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn(state.url);
    }

    isLoggedIn(url: string): boolean {
        if (this.authenticationService.isCustomerAuthenticated) {
            return true;
        }
        this.authenticationService.redirectUrl = url;
        this.router.navigate(['/login']);

        return false;
    }
}
