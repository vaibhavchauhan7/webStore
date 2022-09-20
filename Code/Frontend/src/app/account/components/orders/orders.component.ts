import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Customer, Order} from '../../../shared/entity/models';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSClass, WSToast} from '../../../shared/entity/constants';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

    orders: Order[];
    private subscription$: Subscription[] = [];
    private customer = {} as Customer;

    constructor(private accountService: AccountService,
                private commonService: CommonService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe({
                next: (customer: Customer) => {
                    if (customer && Object.keys(customer).length > 0) {
                        this.customer = customer;
                        this.getOrders();
                    }
                }
            })
        );
    }

    getOrders(): void {
        this.subscription$.push(this.accountService.getOrders(this.customer.id)
            .subscribe({
                next: (orders: Order[]) => {
                    this.orders = orders;
                }, error: () => {
                    this.toastService.showToast(`${WSToast.ERROR_RETRIEVING_ORDERS}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.commonService.httpRequestCompleted();
        this.subscription$?.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
