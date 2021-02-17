import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
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
                private commonService: CommonService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer().subscribe((customer: Customer) => {
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
        this.commonService.httpRequestCompleted();
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
