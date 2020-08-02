import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    redirectUrl: string = '';
    isCustomerAuthenticated: boolean = false;

    constructor(private _http: HttpClient) {
    }

    customerSignUp(signUpFormValue) {
        return this._http.post('/webStoreAPI/sign-up', signUpFormValue);
    }

    customerLogin(loginFormValue) {
        return this._http.post('/webStoreAPI/login', loginFormValue);
    }
}
