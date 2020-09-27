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
        return this.http.post<void>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.SIGN_UP}`, signUpFormValue);
    }

    customerLogin(loginFormValue: Login): Observable<any> {
        return this.http.post<any>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.LOGIN}`, loginFormValue);
    }

    getCustomerDataByToken(token): Observable<Customer> {
        return this.http.get<Customer>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CUSTOMER}/details/${token}`);
    }

    forgotPassword(forgotPasswordFormValue: ForgotPassword): Observable<boolean> {
        return this.http.post<boolean>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.FORGOT}/confirmAccount`, forgotPasswordFormValue);
    }

    updatePassword(updatePasswordFormValue: UpdatePassword): Observable<void> {
        return this.http.post<void>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.FORGOT}/updatePassword`, updatePasswordFormValue);
    }
}
