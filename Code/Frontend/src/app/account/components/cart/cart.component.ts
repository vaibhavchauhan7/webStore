import {Component, OnInit} from '@angular/core';

import {Product} from "../../../shared/entity/product.model";
import {ProductManagementService} from "../../../product/services/product-management.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    progress: number = 0;
    cartProducts: Product[];

    constructor(private _productManagementService: ProductManagementService) {
    }

    ngOnInit(): void {
        this._productManagementService.initializeCartAndWishlist();
        this.getCartProducts();
    }

    getCartProducts() {
        if (this._productManagementService.cartProduct) {
            this.cartProducts = this._productManagementService.cartProduct;
        } else {
            this.cartProducts = this._productManagementService.cartProduct = [];
        }
    }

    removeProduct(product: Product) {
        this._productManagementService.removeProduct(product, 'Cart');
    }

    clearCart() {
        this.cartProducts = this._productManagementService.cartProduct = [];
        localStorage.removeItem('cartProduct');
    }

    checkOut() {
        alert('Checkout is Working!');
    }

}
