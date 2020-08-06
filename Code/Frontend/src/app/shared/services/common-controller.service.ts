import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {Customer} from '../entity/models';

@Injectable({
    providedIn: 'root'
})
export class CommonControllerService {

    redirectUrl = '';

    customerData$ = new BehaviorSubject({} as Customer);
    isCustomerAuthenticated$ = new BehaviorSubject(false);

    constructor() {
    }

    // CustomerData
    getCustomerObserver(): Observable<Customer> {
        return this.customerData$.asObservable();
    }

    setCustomerData(customer: Customer): void {
        this.customerData$.next(customer);
    }

    resetCustomerData(): void {
        this.customerData$.next({} as Customer);
    }

    // CustomerAuthentication
    getCustomerAuthenticationObserver(): Observable<boolean> {
        return this.isCustomerAuthenticated$.asObservable();
    }

    authenticateCustomer(): void {
        this.isCustomerAuthenticated$.next(true);
    }

    revokeCustomerAuthentication(): void {
        this.isCustomerAuthenticated$.next(false);
    }
}
