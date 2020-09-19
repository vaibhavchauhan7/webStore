import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Customer, Product} from '../shared/entity/models';
import {CommonControllerService} from '../shared/services/common-controller.service';
import {WebStoreAPI} from '../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    orders: Product[];
    private customer: Customer;

    constructor(private commonControllerService: CommonControllerService,
                private http: HttpClient) {
        this.getCustomerObserver();
    }

    getCustomerObserver(): void {
        this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
            this.customer = customer;
        });
    }

    getOrdersForCustomer(customerID: number): Observable<Product[]> {
        return this.http.get<Product[]>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.ORDERS}/${customerID}`).pipe(
            tap((productList: Product[]) =>
                this.orders = productList
            )
        );
    }

    checkOut(cartProducts: Product[], customerID?: number): Observable<boolean> {
        customerID = this.customer.id;
        if (customerID) {
            return this.http.post<boolean>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CHECKOUT}/${customerID}`, cartProducts);
        }
    }
}
