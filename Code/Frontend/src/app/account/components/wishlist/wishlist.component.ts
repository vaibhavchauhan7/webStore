import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {Customer, Wishlist} from '../../../shared/entity/models';
import {ProductManagementService} from '../../../product/services/product-management.service';
import {ToastService} from '../../../shared/components/toast/toast.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

    modalID: string;
    wishlistProduct: Wishlist; // Used for Remove Product Confirmation Modal
    wishlistProducts: Wishlist[]; // Sometimes there's an issue with initializing array like: arrayName[] = [];

    private customer: Customer;
    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonControllerService: CommonControllerService,
                private productManagementService: ProductManagementService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerObserver();
    }

    getCustomerObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                    this.initializeWishlist();
                }
            })
        );
    }

    initializeWishlist(): void {
        this.subscription$.push(this.productManagementService.initializeWishlist(this.customer.id)
            .subscribe((productList: Wishlist[]) => {
                this.wishlistProducts = productList;
            })
        );
    }

    removeProductFromWishlist(wishlistProduct: Wishlist, confirmation?: boolean): void {
        this.wishlistProduct = wishlistProduct;
        this.modalID = `wishlist_${wishlistProduct.id}`;
        if (confirmation) {
            this.subscription$.push(this.accountService.removeProductFromWishlist(wishlistProduct, this.customer.id)
                .subscribe(() => {
                    this.productManagementService.wishlistProducts
                        .splice(this.productManagementService.wishlistProducts.indexOf(wishlistProduct), 1);
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
                    this.wishlistProducts = this.productManagementService.wishlistProducts = [];
                    this.toastService.showToast('Wishlist Cleared!', {classname: 'bg-success'});
                    this.resetValues();
                }, () => {
                    this.toastService.showToast('Error in Clearing Wishlist!', {classname: 'bg-red'});
                })
            );
        }
    }

    resetValues(): void {
        this.wishlistProduct = null;
        this.modalID = '';
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
