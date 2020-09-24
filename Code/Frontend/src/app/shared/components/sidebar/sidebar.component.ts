import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../../account/account.service';
import {CommonControllerService} from '../../services/common-controller.service';
import {Customer} from '../../entity/models';
import {ProductManagementService} from '../../../product/services/product-management.service';
import {SidebarService} from './sidebar.service';
import {ToastService} from '../toast/toast.service';
import {WebStoreRouting} from '../../entity/constants';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    routes = {
        account: WebStoreRouting.ACCOUNT,
        cart: WebStoreRouting.CART,
        contact: WebStoreRouting.CONTACT,
        login: WebStoreRouting.LOGIN,
        orders: WebStoreRouting.ORDERS,
        profile: WebStoreRouting.PROFILE,
        wishlist: WebStoreRouting.WISHLIST
    };

    customer: Customer;
    isCustomerAuthenticated: boolean;
    isSidebarOpen: boolean;

    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonControllerService: CommonControllerService,
                private productManagementService: ProductManagementService,
                private sidebarService: SidebarService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerObserver();
        this.getSidebarObserver();
    }

    getCustomerObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                    this.getCustomerAuthenticationObserver();
                }
            })
        );
    }

    getCustomerAuthenticationObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerAuthenticationObserver().subscribe((data: boolean) => {
                this.isCustomerAuthenticated = data;
            })
        );
    }

    getSidebarObserver(): void {
        this.subscription$.push(this.sidebarService.getSidebarObserver().subscribe((data: boolean) => {
                this.isSidebarOpen = data;
            })
        );
    }

    getOrdersForCustomer(): void {
        this.subscription$.push(this.accountService.getOrdersForCustomer(this.customer.id).subscribe());
    }

    getWishlistProducts(): void {
        this.subscription$.push(this.productManagementService.initializeWishlist(this.customer.id)
            .subscribe()
        );
    }

    getCartProducts(): void {
        this.subscription$.push(this.productManagementService.initializeCart(this.customer.id)
            .subscribe()
        );
    }

    logout(): void {
        // TODO: Improvise Logout
        localStorage.clear();
        this.commonControllerService.revokeCustomerAuthentication();
        this.commonControllerService.resetCustomerData();
        this.productManagementService.previousRoute = '/';
        this.productManagementService.cartProducts = [];
        this.productManagementService.wishlistProducts = [];
        this.toastService.showToast(`Successfully Logged Out`, {classname: 'bg-success'});
    }

    hideSidebar(): void {
        this.sidebarService.closeSidebar();
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
