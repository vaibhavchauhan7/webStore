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

    getOrders(customerID: number): Observable<Order[]> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerID}/${WSApi.ORDERS}`;
        return this.http.get<Order[]>(URL);
    }

    modifyProduct(product: Product, customerID: number, type: string, removeProduct: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerID}/${WSApi.PRODUCT}/${type}?removeProduct=${removeProduct}`;
        return this.http.post<void>(URL, product);
    }

    clearProducts(customerID: number, type: string): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerID}/${WSApi.CLEAR}/${type}`;
        return this.http.post<void>(URL, {});
    }

    checkOut(cartProducts: Product[], customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerID}/${WSApi.CHECKOUT}`;
        return this.http.post<void>(URL, cartProducts);
    }

}
