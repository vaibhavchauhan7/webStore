import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../authentication/services/authentication.service';
import {CommonControllerService} from '../shared/services/common-controller.service';
import {Product} from '../shared/entity/models';
import {ProductManagementService} from './services/product-management.service';
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

    private subscription$: Subscription;

    constructor(private authenticationService: AuthenticationService,
                private route: ActivatedRoute,
                private router: Router,
                private titleService: Title,
                private productManagementService: ProductManagementService,
                private commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthenticationObserver();
        this.productManagementService.initializeCartAndWishlist();
        this.selectedProduct();
    }

    getCustomerAuthenticationObserver(): void {
        this.commonControllerService.getCustomerAuthenticationObserver().subscribe((data: boolean) => {
            this.isCustomerAuthenticated = data;
        });
    }

    selectedProduct(): void {
        const productId = this.route.snapshot.params.id;
        this.subscription$ = this.productManagementService.selectedProduct(+productId).subscribe(
            (data: Product) => {
                this.product = data;
                this.titleService.setTitle(`webStore - ${this.product.name}`);
                this.checkProductAvailability(this.product);
            }
        );
    }

    addProduct(product: Product, type: string): void {
        if (this.isCustomerAuthenticated) {
            if (type === 'Cart') {
                this.productManagementService.addProduct(product, 'Cart');
                this.cartButton = `${WebStoreCart.ADDED_TO_CART}`;
                this.cartButtonClass = `${WebStoreCart.CLASS_ADDED_TO_CART}`;
                this.disableCartButton = true;
            } else {
                this.productManagementService.addProduct(product, 'Wishlist');
                this.wishlistButton = `${WebStoreWishlist.ADDED_TO_WISHLIST}`;
                this.wishlistButtonClass = `${WebStoreWishlist.CLASS_ADDED_TO_WISHLIST}`;
                this.disableWishlistButton = true;
            }
        } else {
            this.router.navigate([`${WebStoreRouting.LOGIN}`]);
        }
    }

    checkProductAvailability(product: Product): void {
        if (this.productManagementService.ifArrayIncludes(product, this.productManagementService.cartProduct)) {
            this.cartButton = `${WebStoreCart.ALREADY_IN_CART}`;
            this.cartButtonClass = `${WebStoreCart.CLASS_ADDED_TO_CART}`;
            this.disableCartButton = true;
        }
        if (this.productManagementService.ifArrayIncludes(product, this.productManagementService.wishlistProduct)) {
            this.wishlistButton = `${WebStoreWishlist.ALREADY_IN_WISHLIST}`;
            this.wishlistButtonClass = `${WebStoreWishlist.CLASS_ADDED_TO_WISHLIST}`;
            this.disableWishlistButton = true;
        }
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
