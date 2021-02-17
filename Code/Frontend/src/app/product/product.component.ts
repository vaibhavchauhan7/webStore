import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';

import {AccountService} from '../account/account.service';
import {CommonService} from '../shared/services/common.service';
import {Customer, Product} from '../shared/entity/models';
import {ProductService} from './services/product.service';
import {ToastService} from '../shared/components/toast/toast.service';
import {WSCart, WSRouting, WSWishlist} from '../shared/entity/constants';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    private subscription$: Subscription[] = [];
    private customerID: number;

    isCustomerAuthenticated: boolean;
    product: Product;

    cartButton = `${WSCart.DEFAULT_TITLE}`;
    wishlistButton = `${WSWishlist.DEFAULT_TITLE}`;

    cartButtonClass = `${WSCart.DEFAULT_CLASS}`;
    wishlistButtonClass = `${WSWishlist.DEFAULT_CLASS}`;

    disableCartButton: boolean;
    disableWishlistButton: boolean;

    constructor(private route: ActivatedRoute,
                private accountService: AccountService,
                private commonService: CommonService,
                private productService: ProductService,
                private router: Router,
                private titleService: Title,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
        this.selectedProduct();
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customerID = customer.id;
                    this.getCustomerAuthentication();
                    this.initializeCartAndWishlist();
                }
            })
        );
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe((data: boolean) => {
                this.isCustomerAuthenticated = data;
            })
        );
    }

    initializeCartAndWishlist(): void {
        this.selectedProduct(); // TODO : Need twice? Line 47 & 71
        if (this.productService.wishlistProducts.length === 0) {
            this.initializeWishlist();
        }
        if (this.productService.cartProducts.length === 0) {
            this.initializeCart();
        }
    }

    initializeCart(): void {
        this.subscription$.push(this.productService.initializeCart(this.customerID)
            .subscribe(() => {
                this.checkProductAvailability(this.product);
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Cart!`,
                    {classname: 'bg-red'});
            })
        );
    }

    initializeWishlist(): void {
        this.subscription$.push(this.productService.initializeWishlist(this.customerID)
            .subscribe(() => {
                this.checkProductAvailability(this.product);
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Wishlist!`,
                    {classname: 'bg-red'});
            })
        );
    }

    selectedProduct(): void {
        this.productService.previousRoute = this.router.url;
        const productID = this.route.snapshot.params.id;
        this.subscription$.push(this.productService.selectedProduct(+productID).subscribe(
            (product: Product) => {
                this.product = product;
                this.titleService.setTitle(`webStore : ${this.product.name}`);
                this.checkProductAvailability(this.product);
            }, () => {
                this.toastService.showToast(`Error - Couldn't Get This Product!`,
                    {classname: 'bg-red'});
            }
        ));
    }

    addProductToWishlist(product: Product): void {
        if (this.isCustomerAuthenticated) {
            this.subscription$.push(this.accountService.modifyProduct(product, this.customerID, 'Wishlist', 0)
                .subscribe(() => {
                    this.wishlistButton = `${WSWishlist.ADDED_TO_WISHLIST}`;
                    this.wishlistButtonClass = `${WSWishlist.CLASS_ADDED_TO_WISHLIST}`;
                    this.disableWishlistButton = true;
                }, () => {
                    this.toastService.showToast(`Error - Couldn't Add Product To Wishlist!`,
                        {classname: 'bg-red'});
                })
            );
        } else {
            this.productService.previousRoute = this.router.url;
            this.router.navigateByUrl(`${WSRouting.LOGIN}`).then();
        }
    }

    addProductToCart(product: Product): void {
        if (this.isCustomerAuthenticated) {
            this.subscription$.push(this.accountService.modifyProduct(product, this.customerID, 'Cart', 0)
                .subscribe(() => {
                    this.cartButton = `${WSCart.ADDED_TO_CART}`;
                    this.cartButtonClass = `${WSCart.CLASS_ADDED_TO_CART}`;
                    this.disableCartButton = true;
                }, () => {
                    this.toastService.showToast(`Error - Couldn't Add Product To Cart!`,
                        {classname: 'bg-red'});
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
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }

}
