import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Customer} from '../../shared/entity/customer.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    redirectUrl = '';
    isCustomerAuthenticated = false;

    constructor(private http: HttpClient) {
    }

    customerSignUp(signUpFormValue): Observable<void> {
        return this.http.post<void>('/webStoreAPI/sign-up', signUpFormValue);
    }

    customerLogin(loginFormValue): Observable<any> {
        return this.http.post<any>('/webStoreAPI/login', loginFormValue);
    }

    getCustomerByEmail(token): Observable<Customer> {
        return this.http.get<Customer>(`/webStoreAPI/customer/details/${token}`);
    }
}
