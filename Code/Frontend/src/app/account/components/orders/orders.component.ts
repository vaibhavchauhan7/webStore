import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {Customer, Product} from '../../../shared/entity/models';
import {CommonControllerService} from '../../../shared/services/common-controller.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

    orders: Product[];
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
            this.subscription$.push(this.accountService.getOrdersForCustomer(customerID).subscribe((productList: Product[]) => {
                this.orders = productList;
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
