import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {Order} from '../../../shared/entity/models';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

    orders: Order[];

    private subscription$: Subscription;

    constructor(private accountService: AccountService) {
    }

    ngOnInit(): void {
        this.getOrdersForCustomer();
    }

    getOrdersForCustomer(): void {
        this.subscription$ = this.accountService.getOrdersForCustomer().subscribe((orderList: Order[]) => {
            this.orders = orderList;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
