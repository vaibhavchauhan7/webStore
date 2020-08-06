import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Customer} from '../../shared/entity/models';
import {WebStoreAPI} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    customerSignUp(signUpFormValue): Observable<void> {
        return this.http.post<void>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.SIGN_UP}`, signUpFormValue);
    }

    customerLogin(loginFormValue): Observable<any> {
        return this.http.post<any>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.LOGIN}`, loginFormValue);
    }

    getCustomerByEmail(token): Observable<Customer> {
        return this.http.get<Customer>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CUSTOMERS}/details/${token}`);
    }
}
