import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Cart, Customer, Order, Product, Wishlist} from '../shared/entity/models';
import {WebStoreAPI} from '../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpClient) {
    }

    updateCustomerProfile(editProfileData: Customer): Observable<Customer> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.PROFILE}/${WebStoreAPI.UPDATE}`;
        return this.http.post<Customer>(URL, editProfileData);
    }

    getOrdersForCustomer(customerID: number): Observable<Order[]> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.ORDERS}/${customerID}`;
        return this.http.get<Order[]>(URL);
    }

    addProductToWishlist(product: Product, customerID: number): Observable<void> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/${WebStoreAPI.ADD_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, product);
    }

    addProductToCart(product: Product, customerID: number): Observable<void> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CART}/${WebStoreAPI.ADD_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, product);
    }

    removeProductFromWishlist(wishlistProduct: Wishlist, customerID: number): Observable<void> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/${WebStoreAPI.REMOVE_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, wishlistProduct);
    }

    removeProductFromCart(cartProduct: Cart, customerID: number): Observable<void> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CART}/${WebStoreAPI.REMOVE_PRODUCT}/${customerID}`;
        return this.http.post<void>(URL, cartProduct);
    }

    clearWishlist(customerID: number): Observable<void> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/${WebStoreAPI.CLEAR_WISHLIST}/${customerID}`;
        return this.http.post<void>(URL, {});
    }

    clearCart(customerID: number): Observable<void> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CART}/${WebStoreAPI.CLEAR_CART}/${customerID}`;
        return this.http.post<void>(URL, {});
    }

    checkOut(cartProducts: Product[], customerID: number): Observable<void> {
        const URL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CHECKOUT}/${customerID}`;
        return this.http.post<void>(URL, cartProducts);
    }
}
