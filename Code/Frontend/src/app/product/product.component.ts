import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';

import {AccountService} from '../account/account.service';
import {CommonService} from '../shared/services/common.service';
import {Customer, Product} from '../shared/entity/models';
import {ProductService} from './services/product.service';
import {ToastService} from '../shared/components/toast/toast.service';
import {ProductType, WSCart, WSClass, WSRouting, WSTitle, WSToast, WSWishlist} from '../shared/entity/constants';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    customerAuthenticated = false;
    product = {} as Product;
    cartButton = `${WSCart.DEFAULT_TITLE}`;
    wishlistButton = `${WSWishlist.DEFAULT_TITLE}`;
    cartButtonClass = `${WSCart.DEFAULT_CLASS}`;
    wishlistButtonClass = `${WSWishlist.DEFAULT_CLASS}`;
    disableCartButton = false;
    disableWishlistButton = false;
    private subscription$: Subscription[] = [];
    private customerId = 0;

    constructor(private route: ActivatedRoute,
                private accountService: AccountService,
                private commonService: CommonService,
                private productService: ProductService,
                private router: Router,
                private titleService: Title,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.viewProduct();
        this.getCustomer();
    }

    viewProduct(): void {
        this.productService.previousRoute = this.router.url;
        const productId = this.route.snapshot.params.id;
        this.subscription$.push(this.productService.viewProduct(+productId)
            .subscribe({
                next: (product: Product) => {
                    this.product = product;
                    this.titleService.setTitle(`${WSTitle.WEB_STORE} : ${this.product.name}`);
                    this.checkProductAvailability(this.product);
                }, error: () => {
                    this.toastService.showToast(`Error - Couldn't Get This Product!`,
                        {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe({
                next: (customer: Customer) => {
                    if (customer && Object.keys(customer).length > 0) {
                        this.customerId = customer.id;
                        this.getCustomerAuthentication();
                        this.initializeCartAndWishlist();
                    }
                }
            })
        );
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe({
                next: (data: boolean) => {
                    this.customerAuthenticated = data;
                }
            })
        );
    }

    initializeCartAndWishlist(): void {
        if (this.productService.cartProducts.length === 0) this.initializeCart();
        if (this.productService.wishlistProducts.length === 0) this.initializeWishlist();
    }

    initializeCart(): void {
        this.subscription$.push(this.productService.initializeCart(this.customerId)
            .subscribe({
                next: () => {
                    this.checkProductAvailability(this.product);
                }, error: () => {
                    this.toastService.showToast(`${WSToast.ERROR_RETRIEVING_CART}`,
                        {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    initializeWishlist(): void {
        this.subscription$.push(this.productService.initializeWishlist(this.customerId)
            .subscribe({
                next: () => {
                    this.checkProductAvailability(this.product);
                }, error: () => {
                    this.toastService.showToast(`${WSToast.ERROR_RETRIEVING_WISHLIST}`,
                        {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    addProductToWishlist(product: Product): void {
        if (this.customerAuthenticated) {
            this.subscription$.push(this.accountService.modifyProduct(product, this.customerId, `${ProductType.WISHLIST}`, 0)
                .subscribe({
                    next: () => {
                        this.wishlistButton = `${WSWishlist.ADDED_TO_WISHLIST}`;
                        this.wishlistButtonClass = `${WSWishlist.CLASS_ADDED_TO_WISHLIST}`;
                        this.disableWishlistButton = true;
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.ERROR_ADDING_PRODUCT_WISHLIST}`,
                            {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        } else {
            this.productService.previousRoute = this.router.url;
            this.router.navigateByUrl(`${WSRouting.LOGIN}`).then();
        }
    }

    addProductToCart(product: Product): void {
        if (this.customerAuthenticated) {
            this.subscription$.push(this.accountService.modifyProduct(product, this.customerId, `${ProductType.CART}`, 0)
                .subscribe({
                    next: () => {
                        this.cartButton = `${WSCart.ADDED_TO_CART}`;
                        this.cartButtonClass = `${WSCart.CLASS_ADDED_TO_CART}`;
                        this.disableCartButton = true;
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.ERROR_ADDING_PRODUCT_CART}`,
                            {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        } else {
            this.productService.previousRoute = this.router.url;
            this.router.navigateByUrl(`${WSRouting.LOGIN}`).then();
        }
    }

    checkProductAvailability(product: Product): void {
        if (this.productService.ifArrayIncludes(product, this.productService.cartProducts)) {
            this.cartButton = `${WSCart.ALREADY_IN_CART}`;
            this.cartButtonClass = `${WSCart.CLASS_ADDED_TO_CART}`;
            this.disableCartButton = true;
        }

        if (this.productService.ifArrayIncludes(product, this.productService.wishlistProducts)) {
            this.wishlistButton = `${WSWishlist.ALREADY_IN_WISHLIST}`;
            this.wishlistButtonClass = `${WSWishlist.CLASS_ADDED_TO_WISHLIST}`;
            this.disableWishlistButton = true;
        }
    }

    ngOnDestroy(): void {
        this.subscription$?.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
