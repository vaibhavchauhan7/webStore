import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {Customer} from '../entity/models';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private customerData$ = new BehaviorSubject({} as Customer);
    private isCustomerAuthenticated$ = new BehaviorSubject(false);
    private loadingSpinner$ = new BehaviorSubject<string>('');

    constructor() {
    }

    // Customer
    getCustomer(): Observable<Customer> {
        return this.customerData$.asObservable();
    }

    setCustomer(customer: Customer): void {
        this.customerData$.next(customer);
    }

    resetCustomer(): void {
        this.customerData$.next({} as Customer);
    }

    // Customer Authentication
    getCustomerAuthentication(): Observable<boolean> {
        return this.isCustomerAuthenticated$.asObservable();
    }

    authenticateCustomer(): void {
        this.isCustomerAuthenticated$.next(true);
    }

    revokeCustomerAuthentication(): void {
        this.isCustomerAuthenticated$.next(false);
    }

    // Loading Spinner
    getLoadingSpinnerStatus(): Observable<string> {
        return this.loadingSpinner$.asObservable();
    }

    httpRequestInitiated(): void {
        this.loadingSpinner$.next('start');
    }

    httpRequestCompleted(): void {
        this.loadingSpinner$.next('stop');
    }
}
