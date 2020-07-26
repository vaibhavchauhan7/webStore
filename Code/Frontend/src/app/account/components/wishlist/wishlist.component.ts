import {Component, OnInit} from '@angular/core';

import {Product} from "../../../shared/entity/product.model";
import {ProductManagementService} from "../../../product/services/product-management.service";

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

    wishlistProducts: Product[];

    constructor(private _productManagementService: ProductManagementService) {
    }

    ngOnInit(): void {
        this._productManagementService.initializeCartAndWishlist();
        this.getWishlistProducts();
    }

    getWishlistProducts() {
        if (this._productManagementService.wishlistProduct) {
            this.wishlistProducts = this._productManagementService.wishlistProduct;
        } else {
            this.wishlistProducts = this._productManagementService.wishlistProduct = [];
        }
    }

    removeProduct(product: Product) {
        this._productManagementService.removeProduct(product, 'Wishlist');
    }

    clearWishlist() {
        this.wishlistProducts = this._productManagementService.wishlistProduct = [];
        localStorage.removeItem('wishlistProduct');
    }

}
