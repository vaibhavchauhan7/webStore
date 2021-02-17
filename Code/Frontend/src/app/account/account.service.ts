import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Cart, Customer, Order, Product, Wishlist} from '../shared/entity/models';
import {WSApi} from '../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClient) {
    }

    updateCustomerProfile(editProfileData: Customer): Observable<Customer> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.PROFILE}/${WSApi.UPDATE}`;
        return this.http.post<Customer>(URL, editProfileData);
    }

    getOrdersForCustomer(customerID: number): Observable<Order[]> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.ORDERS}/${customerID}`;
        return this.http.get<Order[]>(URL);
    }

    addProductToWishlist(product: Product, customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.WISHLIST}/${WSApi.ADD_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, product);
    }

    addProductToCart(product: Product, customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CART}/${WSApi.ADD_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, product);
    }

    removeProductFromWishlist(wishlistProduct: Wishlist, customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.WISHLIST}/${WSApi.REMOVE_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, wishlistProduct);
    }

    removeProductFromCart(cartProduct: Cart, customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CART}/${WSApi.REMOVE_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, cartProduct);
    }

    clearWishlist(customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.WISHLIST}/${WSApi.CLEAR_WISHLIST}/${customerID}`;
        return this.http.post<void>(URL, {});
    }

    clearCart(customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CART}/${WSApi.CLEAR_CART}/${customerID}`;
        return this.http.post<void>(URL, {});
    }

    checkOut(cartProducts: Product[], customerID: number): Observable<void> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CHECKOUT}/${customerID}`;
        return this.http.post<void>(URL, cartProducts);
    }
}
