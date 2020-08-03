import {Component, OnInit} from '@angular/core';

import {Product} from '../../../shared/entity/product.model';
import {ProductManagementService} from '../../../product/services/product-management.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    progress = 0;
    cartProducts: Product[];

    constructor(private productManagementService: ProductManagementService) {
    }

    ngOnInit(): void {
        this.productManagementService.initializeCartAndWishlist();
        this.getCartProducts();
    }

    getCartProducts(): void {
        if (this.productManagementService.cartProduct) {
            this.cartProducts = this.productManagementService.cartProduct;
        } else {
            this.cartProducts = this.productManagementService.cartProduct = [];
        }
    }

    removeProduct(product: Product): void {
        this.productManagementService.removeProduct(product, 'Cart');
    }

    clearCart(): void {
        this.cartProducts = this.productManagementService.cartProduct = [];
        localStorage.removeItem('cartProduct');
    }

    checkOut(): void {
        alert('Checkout is Working!');
    }
}
