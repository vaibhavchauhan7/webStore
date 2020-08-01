import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import {Customer} from "../../shared/entity/customer.model";
import {CONSTANTS} from "../../shared/entity/constants";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    redirectUrl: string = '';
    isCustomerAuthenticated: boolean = false;

    constructor(private _http: HttpClient) {
    }

    onSignUp(signUpFormValue): Observable<Customer> {
        return this._http.post<Customer>(`${CONSTANTS.API_URL}/sign-up`, signUpFormValue);
    }

    onLogin(loginFormValue) {
        return this._http.post(`${CONSTANTS.API_URL}/login`, loginFormValue);
    }
}
