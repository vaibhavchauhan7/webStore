import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AccountService} from '../../../account/account.service';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {CommonService} from '../../services/common.service';
import {CookieService} from 'ngx-cookie-service';
import {Customer} from '../../entity/models';
import {ProductService} from '../../../product/services/product.service';
import {SidebarService} from './sidebar.service';
import {ToastService} from '../toast/toast.service';
import {WSRouting} from '../../entity/constants';

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

    customer: Customer;
    customerFullName: string;
    isCustomerAuthenticated: boolean;
    isSidebarOpen: boolean;

    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private authenticationService: AuthenticationService,
                private commonService: CommonService,
                private cookieService: CookieService,
                private productService: ProductService,
                private router: Router,
                private sidebarService: SidebarService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
        this.getSidebarObserver();
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer().subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                    this.customerFullName = this.customer.firstName + ' ' + this.customer.lastName;
                    this.getCustomerAuthentication();
                }
            })
        );
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication().subscribe((data: boolean) => {
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

    customerLogout(): void {
        this.cookieService.delete('token');
        this.commonService.revokeCustomerAuthentication();
        this.subscription$.push(this.authenticationService.customerLogout().subscribe(() => {
                this.commonService.resetCustomer();
                this.productService.previousRoute = '/';
                this.productService.cartProducts = [];
                this.productService.wishlistProducts = [];
                this.router.navigateByUrl('/').then();
                this.toastService.showToast(`Successfully Logged Out!`, {classname: 'bg-success'});
            }, () => {
                this.toastService.showToast(`Error Logging Out!`, {classname: 'bg-red'});
            }
        ));
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
