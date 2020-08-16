import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Customer, Product} from '../../shared/entity/models';
import {WebStoreAPI} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class ProductManagementService {

    cartProduct: Product[] = [];
    wishlistProduct: Product[] = [];

    private allProducts: Product[];  // Basic State Management

    constructor(private http: HttpClient) {
    }

    // Temporary Methods

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CUSTOMERS}`);
    }

    getCustomerByID(customerID: number): Observable<Customer> {
        return this.http.get<Customer>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CUSTOMER}/${customerID}`);
    }

    // Temporary Methods End

    initializeCartAndWishlist(): void {
        if ('cartProduct' in localStorage) {
            this.cartProduct = JSON.parse(localStorage.getItem('cartProduct'));
        }
        if ('wishlistProduct' in localStorage) {
            this.wishlistProduct = JSON.parse(localStorage.getItem('wishlistProduct'));
        }
    }

    getProducts(): Observable<Product[]> {
        if (this.allProducts) {
            return of(this.allProducts);
        }
        return this.http.get<Product[]>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.PRODUCTS}`).pipe(
            tap((productList: Product[]) =>
                this.allProducts = productList
            )
        );
    }

    selectedProduct(productID: number): Observable<Product> {
        if (this.allProducts) {
            const foundProduct = this.allProducts.find((item: Product) => item.id === productID);
            if (foundProduct) {
                return of(foundProduct);
            }
        }
        return this.getProducts().pipe(
            map((productList: Product[]) => productList.find((item: Product) => item.id === productID))
        );
    }

    addProduct(product: Product, productType: string): void {
        if (productType === 'Cart') {
            this.cartProduct.push(product);
            localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
        } else {
            this.wishlistProduct.push(product);
            localStorage.setItem('wishlistProduct', JSON.stringify(this.wishlistProduct));
        }
    }

    removeProduct(product: Product, productType: string): void {
        if (productType === 'Cart') {
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
        } else {
            return false;
        }
    }
}
