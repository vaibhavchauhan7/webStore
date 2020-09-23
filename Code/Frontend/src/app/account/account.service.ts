import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Customer, Order, Product} from '../shared/entity/models';
import {CommonControllerService} from '../shared/services/common-controller.service';
import {WebStoreAPI} from '../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    orders: Order[];
    private customer: Customer;

    constructor(private commonControllerService: CommonControllerService,
                private http: HttpClient) {
        this.getCustomerObserver();
    }

    getCustomerObserver(): void {
        this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                }
            }
        );
    }

    getOrdersForCustomer(): Observable<Order[]> {
        return this.http.get<Order[]>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.ORDERS}/${this.customer.id}`);
    }

    checkOut(cartProducts: Product[]): Observable<boolean> {
        const checkOutURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CHECKOUT}/${this.customer.id}`;
        return this.http.post<boolean>(checkOutURL, cartProducts);
    }
}
