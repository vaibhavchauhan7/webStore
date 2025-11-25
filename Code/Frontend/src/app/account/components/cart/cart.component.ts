import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Cart, Customer, Product} from '../../../shared/entity/models';
import {ProductService} from '../../../product/services/product.service';
import {ProductType, WSClass, WSRouting, WSToast} from '../../../shared/entity/constants';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {ModalComponent} from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    imports: [
        RouterLink,
        ModalComponent,
        NgIf,
        NgForOf,
        RouterLinkActive,
        NgOptimizedImage
    ],
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    modalId: string = '';
    isSmallDevice: boolean = false;
    cartProduct: Cart; // Used for Remove Product Confirmation Modal
    cartProducts: Cart[];

    private customer: Customer;
    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonService: CommonService,
                private productService: ProductService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
        if (window.innerWidth < 769) this.isSmallDevice = true;
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe({
                next: (customer: Customer): void => {
                    if (customer && Object.keys(customer).length > 0) {
                        this.customer = customer;
                        this.initializeCart();
                    }
                }
            })
        );
    }

    initializeCart(): void {
        this.subscription$.push(this.productService.initializeCart(this.customer.id)
            .subscribe({
                next: (productList: Cart[]): void => {
                    this.cartProducts = productList;
                }, error: (): void => {
                    this.toastService.showToast(`${WSToast.ERROR_RETRIEVING_CART}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    removeProductFromCart(cartProduct: Cart, confirmation?: boolean): void {
        this.cartProduct = cartProduct;
        this.modalId = `cart_${cartProduct.id}`;
        if (confirmation) this.removeProduct(cartProduct, 'removeProduct');
    }

    clearCart(confirmation?: boolean): void {
        this.modalId = 'clearCart';
        if (confirmation) {
            this.subscription$.push(this.accountService.clearProducts(this.customer.id, `${ProductType.CART}`)
                .subscribe({
                    next: (): void => {
                        this.cartProducts = this.productService.cartProducts = [];
                        this.toastService.showToast(`${WSToast.CART_CLEARED}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                        this.resetValues();
                    }, error: (): void => {
                        this.toastService.showToast(`${WSToast.ERROR_CLEARING_CART}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    moveToWishlist(cartProduct: Cart, confirmation?: boolean): void {
        this.cartProduct = cartProduct;
        this.modalId = 'moveToWishlist';
        if (confirmation) {
            this.subscription$.push(this.accountService.modifyProduct(cartProduct, this.customer.id, `${ProductType.WISHLIST}`, 0)
                .subscribe({
                    next: (): void => {
                        this.removeProduct(cartProduct, 'moveToWishlist');
                    }, error: (): void => {
                        this.toastService.showToast(`${WSToast.ERROR_ADDING_PRODUCT_WISHLIST}`,
                            {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    removeProduct(cartProduct: Cart, type: string): void {
        this.subscription$.push(this.accountService.modifyProduct(cartProduct, this.customer.id, `${ProductType.CART}`, 1)
            .subscribe({
                next: (): void => {
                    this.productService.cartProducts
                        .splice(this.productService.cartProducts.indexOf(cartProduct), 1);

                    if (type === 'moveToWishlist') this.toastService.showToast(
                        `${cartProduct.name} ${WSToast.MOVED_TO_WISHLIST}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                    if (type === 'removeProduct') this.toastService.showToast(
                        `Removed ${cartProduct.name}!`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                    this.resetValues();
                }, error: (): void => {
                    this.toastService.showToast(`${WSToast.PRODUCT_REMOVAL_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    checkOut(cartProducts: Product[], confirmation?: boolean): void {
        this.modalId = 'checkOut';
        if (confirmation) {
            this.subscription$.push(this.accountService.checkOut(cartProducts, this.customer.id).subscribe({
                    next: (): void => {
                        this.clearOutAllProductsInCart();
                    }, error: (): void => {
                        this.toastService.showToast(`${WSToast.CHECKOUT_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
            this.resetValues();
        }
    }

    clearOutAllProductsInCart(): void {
        this.subscription$.push(this.accountService.clearProducts(this.customer.id, `${ProductType.CART}`)
            .subscribe({
                next: (): void => {
                    this.cartProducts = [];
                    this.productService.cartProducts = [];
                    this.toastService.showToast(`${WSToast.CHECKOUT_SUCCESSFUL}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                    this.router.navigateByUrl(`/${WSRouting.ACCOUNT}/${WSRouting.ORDERS}`).then();
                }, error: (): void => {
                    this.toastService.showToast(`${WSToast.CHECKOUT_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    resetValues(): void {
        this.cartProduct = null;
        this.modalId = '';
    }

    ngOnDestroy(): void {
        this.commonService.httpRequestCompleted();
        this.subscription$?.forEach((subscription: Subscription): void => {
            subscription.unsubscribe();
        });
    }

}
