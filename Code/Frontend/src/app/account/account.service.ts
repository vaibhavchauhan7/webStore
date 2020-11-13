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

    updateCustomerProfile(editProfileDataValue: Customer): Observable<Customer> {
        const updateProfileURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.PROFILE}/update`;
        return this.http.post<Customer>(updateProfileURL, editProfileDataValue);
    }

    getOrdersForCustomer(customerID: number): Observable<Order[]> {
        const getOrdersURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.ORDERS}/${customerID}`;
        return this.http.get<Order[]>(getOrdersURL);
    }

    addProductToWishlist(product: Product, customerID: number): Observable<void> {
        const addProductURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/addProduct/${customerID}`;
        return this.http.post<void>(addProductURL, product);
    }

    addProductToCart(product: Product, customerID: number): Observable<void> {
        const addProductURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CART}/addProduct/${customerID}`;
        return this.http.post<void>(addProductURL, product);
    }

    removeProductFromWishlist(wishlistProduct: Wishlist, customerID: number): Observable<void> {
        const removeProductURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/removeProduct/${customerID}`;
        return this.http.post<void>(removeProductURL, wishlistProduct);
    }

    removeProductFromCart(cartProduct: Cart, customerID: number): Observable<void> {
        const removeProductURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CART}/removeProduct/${customerID}`;
        return this.http.post<void>(removeProductURL, cartProduct);
    }

    clearWishlist(customerID: number): Observable<void> {
        const clearURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/clearWishlist/${customerID}`;
        return this.http.post<void>(clearURL, {});
    }

    clearCart(customerID: number): Observable<void> {
        const clearURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CART}/clearCart/${customerID}`;
        return this.http.post<void>(clearURL, {});
    }

    checkOut(cartProducts: Product[], customerID: number): Observable<boolean> {
        const checkOutURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CHECKOUT}/${customerID}`;
        return this.http.post<boolean>(checkOutURL, cartProducts);
    }
}
