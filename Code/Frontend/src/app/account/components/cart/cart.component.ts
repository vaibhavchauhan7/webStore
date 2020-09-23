import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {Product} from '../../../shared/entity/models';
import {ProductManagementService} from '../../../product/services/product-management.service';
import {ToastService} from '../../../shared/components/toast/toast.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    cartProducts: Product[];
    product: Product;
    modalID: string;

    private subscription$: Subscription;

    constructor(private accountService: AccountService,
                private productManagementService: ProductManagementService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.productManagementService.initializeCartAndWishlist();
        this.getCartProducts();
    }

    getCartProducts(): void {
        if (this.productManagementService.cartProducts.length !== 0) {
            this.cartProducts = this.productManagementService.cartProducts;
        } else {
            this.cartProducts = this.productManagementService.cartProducts = [];
        }
    }

    removeProduct(product: Product, confirmation?: boolean): void {
        this.product = product;
        this.modalID = `cart_${product.id}`;
        if (confirmation) {
            this.productManagementService.removeProduct(product, 'Cart');
            this.toastService.showToast(`${product.name} Removed!`, {classname: 'bg-success'});
            this.resetValues();
        }
    }

    clearCart(confirmation?: boolean): void {
        this.modalID = 'clearCart';
        if (confirmation) {
            this.cartProducts = this.productManagementService.cartProducts = [];
            localStorage.removeItem('cartProduct');
            this.toastService.showToast('Cart Cleared!', {classname: 'bg-success'});
            this.resetValues();
        }
    }

    checkOut(cartProducts: Product[], confirmation?: boolean): void {
        this.modalID = 'checkOut';
        if (confirmation) {
            this.subscription$ = this.accountService.checkOut(cartProducts).subscribe(() => {
                this.cartProducts = [];
                localStorage.removeItem('cartProduct');
                this.productManagementService.cartProducts = [];
                this.toastService.showToast('Checkout Successful!', {classname: 'bg-success'});
            });
            this.resetValues();
        }
    }

    resetValues(): void {
        this.product = null;
        this.modalID = '';
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
