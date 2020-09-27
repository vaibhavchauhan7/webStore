import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../../account/account.service';
import {CommonControllerService} from '../../services/common-controller.service';
import {CookieService} from 'ngx-cookie-service';
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
    customerFullName: string;
    isCustomerAuthenticated: boolean;
    isSidebarOpen: boolean;

    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonControllerService: CommonControllerService,
                private cookieService: CookieService,
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
                    this.customerFullName = this.customer.firstName + ' ' + this.customer.lastName;
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
        this.subscription$.push(this.accountService.getOrdersForCustomer(this.customer.id).subscribe(() => {
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Orders!`, {classname: 'bg-red'});
            }
        ));
    }

    getWishlistProducts(): void {
        this.subscription$.push(this.productManagementService.initializeWishlist(this.customer.id).subscribe(() => {
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Wishlist!`, {classname: 'bg-red'});
            }
        ));
    }

    getCartProducts(): void {
        this.subscription$.push(this.productManagementService.initializeCart(this.customer.id).subscribe(() => {
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Cart!`, {classname: 'bg-red'});
            }
        ));
    }

    logout(): void {
        // TODO: Improvise Logout
        this.cookieService.delete('token');
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
