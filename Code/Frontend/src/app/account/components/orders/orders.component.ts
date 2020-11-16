import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {Customer, Order} from '../../../shared/entity/models';
import {ToastService} from '../../../shared/components/toast/toast.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

    orders: Order[];

    private customer: Customer;
    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonControllerService: CommonControllerService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerObserver();
    }

    getCustomerObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                    this.getOrdersForCustomer();
                }
            })
        );
    }

    getOrdersForCustomer(): void {
        this.subscription$.push(this.accountService.getOrdersForCustomer(this.customer.id)
            .subscribe((orderList: Order[]) => {
                this.orders = orderList;
            }, () => {
                this.toastService.showToast(`Error Retrieving Your Orders!`, {classname: 'bg-red'});
            })
        );
    }

    ngOnDestroy(): void {
        this.commonControllerService.httpRequestCompleted();
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
