import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Customer, Wishlist} from '../../../shared/entity/models';
import {ProductService} from '../../../product/services/product.service';
import {ToastService} from '../../../shared/components/toast/toast.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

    modalID: string;
    isSmallDevice: boolean;
    wishlistProduct: Wishlist; // Used for Remove Product Confirmation Modal
    wishlistProducts: Wishlist[]; // Sometimes there's an issue with initializing array like: arrayName[] = [];

    private customer: Customer;
    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonService: CommonService,
                private productService: ProductService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
        if (window.innerWidth < 769) {
            this.isSmallDevice = true;
        }
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer().subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                    this.initializeWishlist();
                }
            })
        );
    }

    initializeWishlist(): void {
        this.subscription$.push(this.productService.initializeWishlist(this.customer.id)
            .subscribe((productList: Wishlist[]) => {
                this.wishlistProducts = productList;
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Wishlist!`, {classname: 'bg-red'});
            })
        );
    }

    removeProductFromWishlist(wishlistProduct: Wishlist, confirmation?: boolean): void {
        this.wishlistProduct = wishlistProduct;
        this.modalID = `wishlist_${wishlistProduct.id}`;
        if (confirmation) {
            this.subscription$.push(this.accountService.removeProductFromWishlist(wishlistProduct, this.customer.id)
                .subscribe(() => {
                    this.productService.wishlistProducts
                        .splice(this.productService.wishlistProducts.indexOf(wishlistProduct), 1);
                    this.toastService.showToast(`Removed ${wishlistProduct.name}!`, {classname: 'bg-success'});
                    this.resetValues();
                }, () => {
                    this.toastService.showToast(`Couldn't Remove Product!`, {classname: 'bg-red'});
                })
            );
        }
    }

    clearWishlist(confirmation?: boolean): void {
        this.modalID = 'clearWishlist';
        if (confirmation) {
            this.subscription$.push(this.accountService.clearWishlist(this.customer.id)
                .subscribe(() => {
                    this.wishlistProducts = this.productService.wishlistProducts = [];
                    this.toastService.showToast('Wishlist Cleared!', {classname: 'bg-success'});
                    this.resetValues();
                }, () => {
                    this.toastService.showToast('Error Clearing Wishlist!', {classname: 'bg-red'});
                })
            );
        }
    }

    resetValues(): void {
        this.wishlistProduct = null;
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
