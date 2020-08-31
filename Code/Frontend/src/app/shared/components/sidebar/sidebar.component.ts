import {Component, OnInit} from '@angular/core';

import {CommonControllerService} from '../../services/common-controller.service';
import {Customer} from '../../entity/models';
import {SidebarService} from './sidebar.service';
import {WebStoreRouting} from '../../entity/constants';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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

    isSidebarOpen: boolean;
    isCustomerAuthenticated: boolean;

    constructor(private commonControllerService: CommonControllerService,
                private sidebarService: SidebarService) {
    }

    ngOnInit(): void {
        this.getSidebarObserver();
        this.getCustomerAuthenticationObserver();
        this.getCustomerObserver();
    }

    getSidebarObserver(): void {
        this.sidebarService.getSidebarObserver().subscribe((data: boolean) => {
            this.isSidebarOpen = data;
        });
    }

    getCustomerAuthenticationObserver(): void {
        this.commonControllerService.getCustomerAuthenticationObserver().subscribe((data: boolean) => {
            this.isCustomerAuthenticated = data;
        });
    }

    getCustomerObserver(): void {
        this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
            this.customer = customer;
        });
    }

    logout(): void {
        localStorage.clear();
        this.commonControllerService.revokeCustomerAuthentication();
        this.commonControllerService.resetCustomerData();
    }
}
