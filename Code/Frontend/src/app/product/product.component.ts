import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../authentication/services/authentication.service';
import {Product} from '../shared/entity/product.model';
import {ProductManagementService} from './services/product-management.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    product: Product;
    subscription$: Subscription;

    cartButton = 'Add To Cart';
    wishlistButton = 'Add To Wishlist';

    cartButtonClass = 'cart';
    wishlistButtonClass = 'wishlist';

    disableCartButton: boolean;
    disableWishlistButton: boolean;

    constructor(private authenticationService: AuthenticationService,
                private route: ActivatedRoute,
                private router: Router,
                private titleService: Title,
                private productManagementService: ProductManagementService) {
    }

    ngOnInit(): void {
        this.productManagementService.initializeCartAndWishlist();
        this.selectedProduct();
    }

    selectedProduct(): void {
        const productId = this.route.snapshot.params.id;

        this.subscription$ = this.productManagementService.selectedProduct(+productId).subscribe(
            (data: Product) => {
                this.product = data;
                // Set the Tab Title To Product Name
                this.titleService.setTitle(`myStore - ${this.product.name}`);
                this.checkProductAvailability(this.product);
            }
        );
    }

    addProduct(product: Product, type: string): void {
        if (this.authenticationService.isCustomerAuthenticated) {
            if (type === 'Cart') {
                this.productManagementService.addProduct(product, 'Cart');
                this.cartButton = 'Product Added!';
                this.cartButtonClass = 'cartButton';
                this.disableCartButton = true;
            } else {
                this.productManagementService.addProduct(product, 'Wishlist');
                this.wishlistButton = 'Product Added!';
                this.wishlistButtonClass = 'wishlistButton';
                this.disableWishlistButton = true;
            }
        } else {
            this.router.navigate(['/login']);
        }
    }

    checkProductAvailability(product: Product): void {
        if (this.productManagementService.ifArrayIncludes(product, this.productManagementService.cartProduct)) {
            this.cartButton = 'Already in Cart!';
            this.cartButtonClass = 'cartButton';
            this.disableCartButton = true;
        }
        if (this.productManagementService.ifArrayIncludes(product, this.productManagementService.wishlistProduct)) {
            this.wishlistButton = 'Already in Wishlist!';
            this.wishlistButtonClass = 'wishlistButton';
            this.disableWishlistButton = true;
        }
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
