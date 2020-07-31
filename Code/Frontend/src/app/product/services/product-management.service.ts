import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";

import {CONSTANTS} from "../../shared/entity/constants";
import {Customer} from "../../shared/entity/customer.model";
import {Product} from "../../shared/entity/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductManagementService {

    cartProduct: Product[] = [];
    wishlistProduct: Product[] = [];

    private _allProducts: Product[];  // For State Management

    constructor(private _http: HttpClient) {
    }

    getCustomers(): Observable<Customer[]> {
        return this._http.get<Customer[]>(`${CONSTANTS.API_URL}/customers`);
    }

    getCustomerByID(customerID: number): Observable<Customer> {
        return this._http.get<Customer>(`${CONSTANTS.API_URL}/customer/${customerID}`);
    }

    initializeCartAndWishlist() {
        if ('cartProduct' in localStorage) {
            this.cartProduct = JSON.parse(localStorage.getItem('cartProduct'));
        }
        if ('wishlistProduct' in localStorage) {
            this.wishlistProduct = JSON.parse(localStorage.getItem('wishlistProduct'));
        }
    }

    getProducts(): Observable<Product[]> {
        if (this._allProducts) {
            return of(this._allProducts);
        }
        return this._http.get<Product[]>(`${CONSTANTS.API_URL}/products`).pipe(
            tap((data: Product[]) =>
                this._allProducts = data
            )   // Storing data in '_allProducts' as State Management
        );
    }

    selectedProduct(id: number): Observable<Product> {
        if (this._allProducts) {
            const foundProduct = this._allProducts.find((item: Product) => item.id === id);
            if (foundProduct) {
                return of(foundProduct);
            }
        }
        return this.getProducts().pipe(
            map((data: Product[]) => data.find((item: Product) => item.id === id))
        );
    }

    addProduct(product: Product, type: string) {
        if (type === 'Cart') {
            this.cartProduct.push(product);
            localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
        } else {
            this.wishlistProduct.push(product);
            localStorage.setItem('wishlistProduct', JSON.stringify(this.wishlistProduct));
        }
    }

    removeProduct(product: Product, type: string) {
        if (type === 'Cart') {
            this.cartProduct.splice(this.cartProduct.indexOf(product), 1);
            if (this.cartProduct.length !== 0) {
                localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
            } else {
                localStorage.removeItem('cartProduct');
            }
        } else {
            this.wishlistProduct.splice(this.wishlistProduct.indexOf(product), 1);
            if (this.wishlistProduct.length !== 0) {
                localStorage.setItem('wishlistProduct', JSON.stringify(this.wishlistProduct));
            } else {
                localStorage.removeItem('wishlistProduct');
            }
        }
    }

    ifArrayIncludes(product: Product, array: any[]): boolean {
        if (array.length !== 0) {
            const productFound = array.find(
                (item: Product) =>
                    item.id === product.id
            );
            return !!productFound;
        }
    }

}
