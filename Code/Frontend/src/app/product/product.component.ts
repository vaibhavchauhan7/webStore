import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';

import {AccountService} from '../account/account.service';
import {CommonControllerService} from '../shared/services/common-controller.service';
import {Customer, Product} from '../shared/entity/models';
import {ProductManagementService} from './services/product-management.service';
import {ToastService} from '../shared/components/toast/toast.service';
import {WebStoreCart, WebStoreRouting, WebStoreWishlist} from '../shared/entity/constants';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    product: Product;
    isCustomerAuthenticated: boolean;

    cartButton = `${WebStoreCart.DEFAULT_BUTTON_TITLE}`;
    wishlistButton = `${WebStoreWishlist.DEFAULT_BUTTON_TITLE}`;

    cartButtonClass = `${WebStoreCart.DEFAULT_CLASS}`;
    wishlistButtonClass = `${WebStoreWishlist.DEFAULT_CLASS}`;

    disableCartButton: boolean;
    disableWishlistButton: boolean;

    private customer: Customer;
    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonControllerService: CommonControllerService,
                private productManagementService: ProductManagementService,
                private route: ActivatedRoute,
                private router: Router,
                private titleService: Title,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerObserver();
        this.selectedProduct();
    }

    getCustomerObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                    this.getCustomerAuthenticationObserver();
                    this.initializeCartAndWishlist();
                }
            })
        );
    }

    getCustomerAuthenticationObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerAuthenticationObserver()
            .subscribe((data: boolean) => {
                this.isCustomerAuthenticated = data;
            })
        );
    }

    initializeCartAndWishlist(): void {
        this.selectedProduct();
        if (this.productManagementService.wishlistProducts.length === 0) {
            this.initializeWishlist();
        }
        if (this.productManagementService.cartProducts.length === 0) {
            this.initializeCart();
        }
    }

    initializeCart(): void {
        this.subscription$.push(this.productManagementService.initializeCart(this.customer.id)
            .subscribe(() => {
                this.checkProductAvailability(this.product);
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Cart!`, {classname: 'bg-red'});
            })
        );
    }

    initializeWishlist(): void {
        this.subscription$.push(this.productManagementService.initializeWishlist(this.customer.id)
            .subscribe(() => {
                this.checkProductAvailability(this.product);
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Wishlist!`, {classname: 'bg-red'});
            })
        );
    }

    selectedProduct(): void {
        this.productManagementService.previousRoute = this.router.url;
        const productID = this.route.snapshot.params.id;
        this.subscription$.push(this.productManagementService.selectedProduct(+productID).subscribe(
            (product: Product) => {
                this.product = product;
                this.titleService.setTitle(`webStore : ${this.product.name}`);
                this.checkProductAvailability(this.product);
            }, () => {
                this.toastService.showToast(`Error - Couldn't Get This Product!`, {classname: 'bg-red'});
            }
        ));
    }

    addProductToWishlist(product: Product): void {
        if (this.isCustomerAuthenticated) {
            this.subscription$.push(this.accountService.addProductToWishlist(product, this.customer.id)
                .subscribe(() => {
                    this.wishlistButton = `${WebStoreWishlist.ADDED_TO_WISHLIST}`;
                    this.wishlistButtonClass = `${WebStoreWishlist.CLASS_ADDED_TO_WISHLIST}`;
                    this.disableWishlistButton = true;
                }, () => {
                    this.toastService.showToast(`Error - Couldn't Add Product!`, {classname: 'bg-red'});
                })
            );
        } else {
            this.productManagementService.previousRoute = this.router.url;
            this.router.navigateByUrl(`${WebStoreRouting.LOGIN}`).then();
        }
    }

    addProductToCart(product: Product): void {
        if (this.isCustomerAuthenticated) {
            this.subscription$.push(this.accountService.addProductToCart(product, this.customer.id)
                .subscribe(() => {
                    this.cartButton = `${WebStoreCart.ADDED_TO_CART}`;
                    this.cartButtonClass = `${WebStoreCart.CLASS_ADDED_TO_CART}`;
                    this.disableCartButton = true;
                }, () => {
                    this.toastService.showToast(`Error - Couldn't Add Product!`, {classname: 'bg-red'});
                })
            );
        } else {
            this.productManagementService.previousRoute = this.router.url;
            this.router.navigateByUrl(`${WebStoreRouting.LOGIN}`).then();
        }
    }

    checkProductAvailability(product: Product): void {
        if (this.productManagementService.ifArrayIncludes(product, this.productManagementService.cartProducts)) {
            this.cartButton = `${WebStoreCart.ALREADY_IN_CART}`;
            this.cartButtonClass = `${WebStoreCart.CLASS_ADDED_TO_CART}`;
            this.disableCartButton = true;
        }
        if (this.productManagementService.ifArrayIncludes(product, this.productManagementService.wishlistProducts)) {
            this.wishlistButton = `${WebStoreWishlist.ALREADY_IN_WISHLIST}`;
            this.wishlistButtonClass = `${WebStoreWishlist.CLASS_ADDED_TO_WISHLIST}`;
            this.disableWishlistButton = true;
        }
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
