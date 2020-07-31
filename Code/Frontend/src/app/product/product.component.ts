import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {Subscription} from "rxjs";

import {AuthenticationService} from "../authentication/services/authentication.service";
import {Product} from "../shared/entity/product.model";
import {ProductManagementService} from "./services/product-management.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

    product: Product;
    subscription$: Subscription;

    cartButton: string = 'Add To Cart';
    wishlistButton: string = 'Add To Wishlist';

    cartButtonClass: string = 'cart';
    wishlistButtonClass: string = 'wishlist';

    disableCartButton: boolean;
    disableWishlistButton: boolean;

    constructor(private _authenticationService: AuthenticationService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _titleService: Title,
                private _productManagementService: ProductManagementService) {
    }

    ngOnInit(): void {
        this._productManagementService.initializeCartAndWishlist();
        this.selectedProduct();
    }

    selectedProduct() {
        const productId = this._route.snapshot.params.id;

        this.subscription$ = this._productManagementService.selectedProduct(+productId).subscribe(
            (data: Product) => {
                this.product = data;
                // Set the Tab Title To Product Name
                this._titleService.setTitle(`myStore - ${this.product.name}`);
                this.checkProductAvailability(this.product);
            }
        );
    }

    addProduct(product: Product, type: string) {
        if (this._authenticationService.isCustomerAuthenticated) {
            if (type === 'Cart') {
                this._productManagementService.addProduct(product, 'Cart');
                this.cartButton = 'Product Added!';
                this.cartButtonClass = 'cartButton';
                this.disableCartButton = true;
            } else {
                this._productManagementService.addProduct(product, 'Wishlist');
                this.wishlistButton = 'Product Added!';
                this.wishlistButtonClass = 'wishlistButton';
                this.disableWishlistButton = true;
            }
        } else {
            this._router.navigate(['/login']);
        }
    }

    checkProductAvailability(product: Product) {
        if (this._productManagementService.ifArrayIncludes(product, this._productManagementService.cartProduct)) {
            this.cartButton = 'Already in Cart!';
            this.cartButtonClass = 'cartButton';
            this.disableCartButton = true;
        }
        if (this._productManagementService.ifArrayIncludes(product, this._productManagementService.wishlistProduct)) {
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
