import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {CommonService} from '../../services/common.service';
import {CookieService} from 'ngx-cookie-service';
import {Customer} from '../../entity/models';
import {ProductService} from '../../../product/services/product.service';
import {ToastService} from '../toast/toast.service';
import {WSClass, WSRouting} from '../../entity/constants';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    routes = {
        account: WSRouting.ACCOUNT,
        cart: WSRouting.CART,
        contact: WSRouting.CONTACT,
        login: WSRouting.LOGIN,
        orders: WSRouting.ORDERS,
        profile: WSRouting.PROFILE,
        wishlist: WSRouting.WISHLIST
    };
    customer = {} as Customer;
    customerFullName = '';
    customerAuthenticated = false;
    sidebarOpen = false;
    private subscription$: Subscription[] = [];

    constructor(private authenticationService: AuthenticationService,
                private commonService: CommonService,
                private cookieService: CookieService,
                private productService: ProductService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
        this.getSidebarStatus();
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe({
                next: (customer: Customer) => {
                    if (customer && Object.keys(customer).length > 0) {
                        this.customer = customer;
                        this.customerFullName = customer.firstName + ' ' + customer.lastName;
                        this.getCustomerAuthentication();
                    }
                }
            })
        );
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe({
                next: (data: boolean) => {
                    this.customerAuthenticated = data;
                }
            })
        );
    }

    getSidebarStatus(): void {
        this.subscription$.push(this.commonService.getSidebarStatus()
            .subscribe({
                next: (data: boolean) => {
                    this.sidebarOpen = data;
                }
            })
        );
    }

    customerLogout(): void {
        this.cookieService.delete('token');
        this.commonService.revokeCustomerAuthentication();
        this.subscription$.push(this.authenticationService.customerLogout()
            .subscribe({
                next: () => {
                    this.commonService.resetCustomer();
                    this.productService.previousRoute = '/';
                    this.productService.cartProducts = [];
                    this.productService.wishlistProducts = [];
                    this.router.navigateByUrl('/').then();
                    this.toastService.showToast(`Successfully Logged Out!`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                },
                error: () => {
                    this.toastService.showToast(`Error Logging Out!`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    hideSidebar(): void {
        this.commonService.closeSidebar();
    }

    ngOnDestroy(): void {
        this.subscription$?.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
