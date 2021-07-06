import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {Customer} from '../entity/models';
import {WSId} from '../entity/constants';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private customerData$ = new BehaviorSubject({} as Customer);
    private customerAuthenticated$ = new BehaviorSubject(false);
    private sidebarOpen$ = new BehaviorSubject(true);
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
        return this.customerAuthenticated$.asObservable();
    }

    authenticateCustomer(): void {
        this.customerAuthenticated$.next(true);
    }

    revokeCustomerAuthentication(): void {
        this.customerAuthenticated$.next(false);
    }

    // Sidebar
    getSidebarStatus(): Observable<boolean> {
        return this.sidebarOpen$.asObservable();
    }

    openSidebar(): void {
        document.getElementById(`${WSId.BAR_CONTAINER}`).classList.toggle('change');
        return this.sidebarOpen$.next(true);
    }

    closeSidebar(): void {
        document.getElementById(`${WSId.BAR_CONTAINER}`).classList.toggle('change');
        return this.sidebarOpen$.next(false);
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
