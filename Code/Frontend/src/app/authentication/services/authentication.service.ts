import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Customer, ForgotPassword, Login, SignUp, UpdatePassword} from '../../shared/entity/models';
import {WebStoreAPI} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    customerSignUp(signUpFormValue: SignUp): Observable<void> {
        const signUpURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.AUTHENTICATION}/${WebStoreAPI.SIGN_UP}`;
        return this.http.post<void>(signUpURL, signUpFormValue);
    }

    customerLogin(loginFormValue: Login): Observable<any> {
        const loginURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.AUTHENTICATION}/${WebStoreAPI.LOGIN}`;
        return this.http.post<any>(loginURL, loginFormValue);
    }

    logout(): Observable<void> {
        const logoutURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.AUTHENTICATION}/${WebStoreAPI.LOGOUT}`;
        return this.http.post<void>(logoutURL, {});
    }

    getAuthenticatedCustomer(): Observable<Customer> {
        const customerDetailsURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CUSTOMER}/details`;
        return this.http.get<Customer>(customerDetailsURL);
    }

    forgotPassword(forgotPasswordFormValue: ForgotPassword): Observable<boolean> {
        const forgotURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.AUTHENTICATION}/${WebStoreAPI.FORGOT}/confirmAccount`;
        return this.http.post<boolean>(forgotURL, forgotPasswordFormValue);
    }

    updatePassword(updatePasswordFormValue: UpdatePassword): Observable<void> {
        const updatePasswordURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.AUTHENTICATION}/${WebStoreAPI.FORGOT}/updatePassword`;
        return this.http.post<void>(updatePasswordURL, updatePasswordFormValue);
    }
}
