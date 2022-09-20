import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Customer, Order, Product} from '../shared/entity/models';
import {WSApi} from '../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClient) {
    }

    updateProfile(customer: Customer): Observable<Customer> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${WSApi.PROFILE}/${WSApi.UPDATE}`;
        return this.http.post<Customer>(URL, customer);
    }

    getOrders(customerId: number): Observable<Order[]> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerId}/${WSApi.ORDERS}`;
        return this.http.get<Order[]>(URL);
    }

    modifyProduct(product: Product, customerId: number, type: string, removeProduct: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerId}/${WSApi.PRODUCT}/${type}?removeProduct=${removeProduct}`;
        return this.http.post<void>(URL, product);
    }

    clearProducts(customerId: number, type: string): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerId}/${WSApi.CLEAR}/${type}`;
        return this.http.post<void>(URL, {});
    }

    checkOut(cartProducts: Product[], customerId: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerId}/${WSApi.CHECKOUT}`;
        return this.http.post<void>(URL, cartProducts);
    }

}
