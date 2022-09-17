import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Cart, Customer, Product} from '../../../shared/entity/models';
import {ProductService} from '../../../product/services/product.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {ProductType, WSClass, WSRouting, WSToast} from '../../../shared/entity/constants';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    modalID = '';
    isSmallDevice = false;
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
        if (window.innerWidth < 769) {
            this.isSmallDevice = true;
        }
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe({
                next: (customer: Customer) => {
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
                next: (productList: Cart[]) => {
                    this.cartProducts = productList;
                }, error: () => {
                    this.toastService.showToast(`${WSToast.ERROR_RETRIEVING_CART}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    removeProductFromCart(cartProduct: Cart, confirmation?: boolean): void {
        this.cartProduct = cartProduct;
        this.modalID = `cart_${cartProduct.id}`;
        if (confirmation) {
            this.subscription$.push(this.accountService.modifyProduct(cartProduct, this.customer.id, `${ProductType.CART}`, 1)
                .subscribe({
                    next: () => {
                        this.productService.cartProducts
                            .splice(this.productService.cartProducts.indexOf(cartProduct), 1);
                        this.toastService.showToast(`Removed ${cartProduct.name}!`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                        this.resetValues();
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.PRODUCT_REMOVAL_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    clearCart(confirmation?: boolean): void {
        this.modalID = 'clearCart';
        if (confirmation) {
            this.subscription$.push(this.accountService.clearProducts(this.customer.id, `${ProductType.CART}`)
                .subscribe({
                    next: () => {
                        this.cartProducts = this.productService.cartProducts = [];
                        this.toastService.showToast(`${WSToast.CART_CLEARED}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                        this.resetValues();
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.ERROR_CLEARING_CART}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    checkOut(cartProducts: Product[], confirmation?: boolean): void {
        this.modalID = 'checkOut';
        if (confirmation) {
            this.subscription$.push(this.accountService.checkOut(cartProducts, this.customer.id).subscribe({
                    next: () => {
                        this.subscription$.push(this.accountService.clearProducts(this.customer.id, `${ProductType.CART}`)
                            .subscribe({
                                next: () => {
                                    this.cartProducts = [];
                                    this.productService.cartProducts = [];
                                    this.toastService.showToast(`${WSToast.CHECKOUT_SUCCESSFUL}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                                    this.router.navigateByUrl(`/${WSRouting.ACCOUNT}/${WSRouting.ORDERS}`).then();
                                }, error: () => {
                                    this.toastService.showToast(`${WSToast.CHECKOUT_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                                }
                            })
                        );
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.CHECKOUT_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
            this.resetValues();
        }
    }

    resetValues(): void {
        this.cartProduct = null;
        this.modalID = '';
    }

    ngOnDestroy(): void {
        this.commonService.httpRequestCompleted();
        this.subscription$?.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
