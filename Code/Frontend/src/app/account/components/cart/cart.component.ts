import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Cart, Customer, Product} from '../../../shared/entity/models';
import {ProductService} from '../../../product/services/product.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

    modalID: string;
    isSmallDevice: boolean;
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
            .subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                    this.initializeCart();
                }
            })
        );
    }

    initializeCart(): void {
        this.subscription$.push(this.productService.initializeCart(this.customer.id)
            .subscribe((productList: Cart[]) => {
                this.cartProducts = productList;
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Cart!`, {classname: 'bg-red'});
            })
        );
    }

    removeProductFromCart(cartProduct: Cart, confirmation?: boolean): void {
        this.cartProduct = cartProduct;
        this.modalID = `cart_${cartProduct.id}`;
        if (confirmation) {
            this.subscription$.push(this.accountService.modifyProduct(cartProduct, this.customer.id, 'Cart', 1)
                .subscribe(() => {
                    this.productService.cartProducts
                        .splice(this.productService.cartProducts.indexOf(cartProduct), 1);
                    this.toastService.showToast(`Removed ${cartProduct.name}!`, {classname: 'bg-success'});
                    this.resetValues();
                }, () => {
                    this.toastService.showToast(`Couldn't Remove Product!`, {classname: 'bg-red'});
                })
            );
        }
    }

    clearCart(confirmation?: boolean): void {
        this.modalID = 'clearCart';
        if (confirmation) {
            this.subscription$.push(this.accountService.clearProducts(this.customer.id, 'Cart')
                .subscribe(() => {
                    this.cartProducts = this.productService.cartProducts = [];
                    this.toastService.showToast('Cart Cleared!', {classname: 'bg-success'});
                    this.resetValues();
                }, () => {
                    this.toastService.showToast('Error Clearing Cart!', {classname: 'bg-red'});
                })
            );
        }
    }

    checkOut(cartProducts: Product[], confirmation?: boolean): void {
        this.modalID = 'checkOut';
        if (confirmation) {
            this.subscription$.push(this.accountService.checkOut(cartProducts, this.customer.id).subscribe(() => {
                    this.subscription$.push(this.accountService.clearProducts(this.customer.id, 'Cart')
                        .subscribe(() => {
                            this.cartProducts = [];
                            this.productService.cartProducts = [];
                            this.toastService.showToast('Checkout Successful!', {classname: 'bg-success'});
                            this.router.navigateByUrl(`/${WSRouting.ACCOUNT}/${WSRouting.ORDERS}`).then();
                        }, () => {
                            this.toastService.showToast('Checkout Failed!', {classname: 'bg-red'});
                        })
                    );
                }, () => {
                    this.toastService.showToast('Checkout Failed!', {classname: 'bg-red'});
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
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }

}
