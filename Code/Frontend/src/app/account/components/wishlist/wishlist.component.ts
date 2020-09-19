import {Component, OnInit} from '@angular/core';

import {Product} from '../../../shared/entity/models';
import {ProductManagementService} from '../../../product/services/product-management.service';
import {ToastService} from '../../../shared/components/toast/toast.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

    wishlistProducts: Product[];
    product: Product = null;
    modalID: string;

    constructor(private productManagementService: ProductManagementService,
                private toastService: ToastService) {
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

    removeProduct(product: Product, confirmation?: boolean): void {
        this.product = product;
        this.modalID = `wishlist_${product.id}`;
        if (confirmation) {
            this.productManagementService.removeProduct(product, 'Wishlist');
            this.toastService.showToast(`${product.name} Removed!`, {classname: 'bg-success'});
            this.resetValues();
        }
    }

    clearWishlist(confirmation?: boolean): void {
        this.modalID = 'clearWishlist';
        if (confirmation) {
            this.wishlistProducts = this.productManagementService.wishlistProduct = [];
            localStorage.removeItem('wishlistProduct');
            this.toastService.showToast('Wishlist Cleared!', {classname: 'bg-success'});
            this.resetValues();
        }
    }

    resetValues(): void {
        this.product = null;
        this.modalID = '';
    }
}
