import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Cart, Product, Wishlist} from '../../shared/entity/models';
import {WSApi} from '../../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    cartProducts: Cart[] = [];
    wishlistProducts: Wishlist[] = [];
    previousRoute: string;

    private allProducts: Product[];

    constructor(private http: HttpClient) {
    }

    // Temporary Methods Start

    // getCustomers(): Observable<Customer[]> {
    //     return this.http.get<Customer[]>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CUSTOMERS}`);
    // }
    //
    // getCustomerByID(customerID: number): Observable<Customer> {
    //     return this.http.get<Customer>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CUSTOMER}/${customerID}`);
    // }

    // Temporary Methods End

    getProducts(): Observable<Product[]> {
        if (this.allProducts) {
            return of(this.allProducts);
        }
        return this.http.get<Product[]>(`/${WSApi.BASE_URL}/${WSApi.PRODUCTS}`).pipe(
            tap((productList: Product[]) =>
                this.allProducts = productList
            )
        );
    }

    initializeWishlist(customerID: number): Observable<Wishlist[]> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerID}/${WSApi.PRODUCTS}/Wishlist`;
        return this.http.get<Wishlist[]>(URL).pipe(tap((productList: Wishlist[]) => {
                this.wishlistProducts = productList;
            })
        );
    }

    initializeCart(customerID: number): Observable<Cart[]> {
        const URL = `/${WSApi.BASE_URL}/${WSApi.CUSTOMER}/${customerID}/${WSApi.PRODUCTS}/Cart`;
        return this.http.get<Cart[]>(URL).pipe(tap((productList: Cart[]) => {
                this.cartProducts = productList;
            })
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

    ifArrayIncludes(product: Product, array: any[]): boolean {
        if (array.length !== 0) {
            const productFound = array.find((item: Product) =>
                item.id === product.id
            );
            return !!productFound;
        } else {
            return false;
        }
    }
}
