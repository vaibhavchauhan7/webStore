import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Customer, ForgotPassword, Login, SignUp, UpdatePassword} from '../../shared/entity/models';
import {WSApi} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    getAuthenticatedCustomer(): Observable<Customer> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${WSApi.DETAILS}`;
        return this.http.get<Customer>(URL);
    }

    customerSignUp(signUpFormValue: SignUp): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.AUTHENTICATION}/${WSApi.SIGN_UP}`;
        return this.http.post<void>(URL, signUpFormValue);
    }

    customerLogin(loginFormValue: Login): Observable<any> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.AUTHENTICATION}/${WSApi.LOGIN}`;
        return this.http.post<any>(URL, loginFormValue);
    }

    customerLogout(): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.AUTHENTICATION}/${WSApi.LOGOUT}`;
        return this.http.post<void>(URL, {});
    }

    forgotPassword(forgotPasswordFormValue: ForgotPassword): Observable<boolean> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.AUTHENTICATION}/${WSApi.FORGOT}/${WSApi.CONFIRM_ACCOUNT}`;
        return this.http.post<boolean>(URL, forgotPasswordFormValue);
    }

    updatePassword(updatePasswordFormValue: UpdatePassword): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.AUTHENTICATION}/${WSApi.FORGOT}/${WSApi.UPDATE_PASSWORD}`;
        return this.http.post<void>(URL, updatePasswordFormValue);
    }
}
