import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {Customer, Product} from '../../../shared/entity/models';
import {ProductManagementService} from '../../../product/services/product-management.service';
import {ToastService} from '../../../shared/components/toast/toast.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

    modalID: string;
    customer: Customer;
    product: Product; // Used for Remove Product Confirmation Modal
    wishlistProducts: Product[]; // Sometimes there's an issue with initializing array like: arrayName[] = [];

    private subscription$: Subscription[] = [];

    constructor(private commonControllerService: CommonControllerService,
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
                    this.initializeCartAndWishlist();
                }
            })
        );
    }

    initializeCartAndWishlist(): void {
        this.subscription$.push(this.productManagementService.initializeCartAndWishlist(this.customer.id)
            .subscribe((productList: Product[]) => {
                this.wishlistProducts = productList;
            })
        );
    }

    removeProduct(product: Product, confirmation?: boolean): void {
        this.product = product;
        this.modalID = `wishlist_${product.id}`;
        if (confirmation) {
            this.subscription$.push(this.productManagementService.removeProduct(product, 'Wishlist', this.customer.id)
                .subscribe(() => {
                    this.productManagementService.wishlistProducts
                        .splice(this.productManagementService.wishlistProducts.indexOf(product), 1);
                    this.toastService.showToast(`Removed ${product.name}!`, {classname: 'bg-success'});
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
            // TODO: Make API Call Here - Update Proc to Handle This
            this.wishlistProducts = this.productManagementService.wishlistProducts = [];
            this.toastService.showToast('Wishlist Cleared!', {classname: 'bg-success'});
            this.resetValues();
        }
    }

    resetValues(): void {
        this.product = null;
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
