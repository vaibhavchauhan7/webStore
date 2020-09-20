import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {Customer, Order} from '../../../shared/entity/models';
import {CommonControllerService} from '../../../shared/services/common-controller.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

    orders: Order[];
    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.getCustomerObserver();
    }

    getCustomerObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
            this.getOrdersForCustomer(customer.id);
        }));
    }

    getOrdersForCustomer(customerID: number): void {
        if (customerID) { // customerID is getting undefined sometimes on page reload
            this.subscription$.push(this.accountService.getOrdersForCustomer(customerID).subscribe((orderList: Order[]) => {
                this.orders = orderList;
            }));
        }
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
