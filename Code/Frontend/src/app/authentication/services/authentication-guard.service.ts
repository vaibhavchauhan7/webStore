import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs";

import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

    constructor(private _authenticationService: AuthenticationService,
                private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn(state.url);
    }

    isLoggedIn(url: string): boolean {
        if (this._authenticationService.isCustomerAuthenticated) {
            return true;
        }
        this._authenticationService.redirectUrl = url;
        this._router.navigate(['/login']);

        return false;
    }

}
