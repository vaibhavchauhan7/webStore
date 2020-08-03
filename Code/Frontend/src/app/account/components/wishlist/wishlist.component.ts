import {Component, OnInit} from '@angular/core';

import {Product} from '../../../shared/entity/product.model';
import {ProductManagementService} from '../../../product/services/product-management.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

    wishlistProducts: Product[];

    constructor(private productManagementService: ProductManagementService) {
    }

    ngOnInit(): void {
        this.productManagementService.initializeCartAndWishlist();
        this.getWishlistProducts();
    }

    getWishlistProducts(): void {
        if (this.productManagementService.wishlistProduct) {
            this.wishlistProducts = this.productManagementService.wishlistProduct;
        } else {
            this.wishlistProducts = this.productManagementService.wishlistProduct = [];
        }
    }

    removeProduct(product: Product): void {
        this.productManagementService.removeProduct(product, 'Wishlist');
    }

    clearWishlist(): void {
        this.wishlistProducts = this.productManagementService.wishlistProduct = [];
        localStorage.removeItem('wishlistProduct');
    }
}
