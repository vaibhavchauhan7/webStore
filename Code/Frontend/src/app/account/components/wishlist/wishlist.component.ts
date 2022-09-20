import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Customer, Wishlist} from '../../../shared/entity/models';
import {ProductService} from '../../../product/services/product.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {ProductType, WSClass, WSToast} from '../../../shared/entity/constants';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

    modalId = '';
    isSmallDevice = false;
    wishlistProduct: Wishlist; // Used for Remove Product Confirmation Modal
    wishlistProducts: Wishlist[]; // Sometimes there's an issue with initializing array like: arrayName[] = [];
    private subscription$: Subscription[] = [];
    private customer = {} as Customer;

    constructor(private accountService: AccountService,
                private commonService: CommonService,
                private productService: ProductService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
        if (window.innerWidth < 769) this.isSmallDevice = true;
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe({
                next: (customer: Customer) => {
                    if (customer && Object.keys(customer).length > 0) {
                        this.customer = customer;
                        this.initializeWishlist();
                    }
                }
            })
        );
    }

    initializeWishlist(): void {
        this.subscription$.push(this.productService.initializeWishlist(this.customer.id)
            .subscribe({
                next: (productList: Wishlist[]) => {
                    this.wishlistProducts = productList;
                }, error: () => {
                    this.toastService.showToast(`${WSToast.ERROR_RETRIEVING_WISHLIST}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    removeProductFromWishlist(wishlistProduct: Wishlist, confirmation?: boolean): void {
        this.wishlistProduct = wishlistProduct;
        this.modalId = `wishlist_${wishlistProduct.id}`;
        if (confirmation) this.removeProduct(wishlistProduct, 'removeProduct');
    }

    clearWishlist(confirmation?: boolean): void {
        this.modalId = 'clearWishlist';
        if (confirmation) {
            this.subscription$.push(this.accountService.clearProducts(this.customer.id, `${ProductType.WISHLIST}`)
                .subscribe({
                    next: () => {
                        this.wishlistProducts = this.productService.wishlistProducts = [];
                        this.toastService.showToast(`${WSToast.WISHLIST_CLEARED}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                        this.resetValues();
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.ERROR_CLEARING_WISHLIST}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    moveToCart(wishlistProduct: Wishlist, confirmation?: boolean): void {
        this.wishlistProduct = wishlistProduct;
        this.modalId = 'moveToCart';
        if (confirmation) {
            this.subscription$.push(this.accountService.modifyProduct(wishlistProduct, this.customer.id, `${ProductType.CART}`, 0)
                .subscribe({
                    next: () => {
                        this.removeProduct(wishlistProduct, 'moveToCart');
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.ERROR_CLEARING_CART}`,
                            {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    removeProduct(wishlistProduct: Wishlist, type: string): void {
        this.subscription$.push(this.accountService.modifyProduct(wishlistProduct, this.customer.id, `${ProductType.WISHLIST}`, 1)
            .subscribe({
                next: () => {
                    this.productService.wishlistProducts
                        .splice(this.productService.wishlistProducts.indexOf(wishlistProduct), 1);

                    if (type === 'moveToCart') this.toastService.showToast(
                        `${wishlistProduct.name} ${WSToast.MOVED_TO_CART}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                    if (type === 'removeProduct') this.toastService.showToast(
                        `Removed ${wishlistProduct.name}!`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                    this.resetValues();
                }, error: () => {
                    this.toastService.showToast(`${WSToast.PRODUCT_REMOVAL_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    resetValues(): void {
        this.wishlistProduct = null;
        this.modalId = '';
    }

    ngOnDestroy(): void {
        this.commonService.httpRequestCompleted();
        this.subscription$?.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
