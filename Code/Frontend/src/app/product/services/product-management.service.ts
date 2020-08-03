import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {Customer} from '../../shared/entity/customer.model';
import {Product} from '../../shared/entity/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductManagementService {

    cartProduct: Product[] = [];
    wishlistProduct: Product[] = [];

    private allProducts: Product[];  // For State Management

    constructor(private http: HttpClient) {
    }

    getCustomers(): Observable<Customer[]> {
        // If no CORS Error (Leaving Comment for Future Reference)
        // return this.http.get<Customer[]>(`${WebStoreAPI.APIURL}/customers`);

        // If CORS Error: Add proxy.config.json and modify Line 6 in package.json
        return this.http.get<Customer[]>('/webStoreAPI/customers');
    }

    getCustomerByID(customerID: number): Observable<Customer> {
        return this.http.get<Customer>(`/webStoreAPI/customer/${customerID}`);
    }

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
        return this.http.get<Product[]>('/webStoreAPI/products').pipe(
            tap((data: Product[]) =>
                this.allProducts = data
            )
        );
    }

    selectedProduct(id: number): Observable<Product> {
        if (this.allProducts) {
            const foundProduct = this.allProducts.find((item: Product) => item.id === id);
            if (foundProduct) {
                return of(foundProduct);
            }
        }
        return this.getProducts().pipe(
            map((data: Product[]) => data.find((item: Product) => item.id === id))
        );
    }

    addProduct(product: Product, type: string): void {
        if (type === 'Cart') {
            this.cartProduct.push(product);
            localStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
        } else {
            this.wishlistProduct.push(product);
            localStorage.setItem('wishlistProduct', JSON.stringify(this.wishlistProduct));
        }
    }

    removeProduct(product: Product, type: string): void {
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
