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

    cartProducts: Product[] = [];
    wishlistProducts: Product[] = [];
    previousRoute: string;

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

    initializeCartAndWishlist(customerID?: number): Observable<Product[]> {
        if ('cartProduct' in localStorage) {
            this.cartProducts = JSON.parse(localStorage.getItem('cartProduct'));
        }
        return this.http.get<Product[]>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/getProducts/${customerID}`)
            .pipe(tap((productList: Product[]) => {
                    this.wishlistProducts = productList;
                })
            );
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
            const foundProduct = this.allProducts.find((product: Product) => product.id === productID);
            if (foundProduct) {
                return of(foundProduct);
            }
        }
        return this.getProducts().pipe(
            map((productList: Product[]) => productList.find((product: Product) => product.id === productID))
        );
    }

    addProduct(product: Product, productType: string, customerID?: number): Observable<Product[]> {
        if (productType === 'Cart') {
            this.cartProducts.push(product);
            localStorage.setItem('cartProduct', JSON.stringify(this.cartProducts));
        } else {
            const addProductURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/addProduct/${customerID}`;
            return this.http.post<Product[]>(addProductURL, product);
        }
    }

    removeProduct(product: Product, productType: string, customerID?: number): Observable<Product[]> {
        if (productType === 'Cart') {
            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
            if (this.cartProducts.length !== 0) {
                localStorage.setItem('cartProduct', JSON.stringify(this.cartProducts));
            } else {
                localStorage.removeItem('cartProduct');
            }
        } else {
            const removeProductURL = `/${WebStoreAPI.BASE_URL}/${WebStoreAPI.WISHLIST}/removeProduct/${customerID}`;
            return this.http.post<Product[]>(removeProductURL, product);
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
