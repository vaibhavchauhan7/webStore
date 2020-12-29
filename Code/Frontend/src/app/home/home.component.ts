import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';

import {Customer, Product} from '../shared/entity/models';
import {CommonControllerService} from '../shared/services/common-controller.service';
import {ProductManagementService} from '../product/services/product-management.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    searchInput = '';
    productList: Product[] = [];

    private customer: Customer;
    private subscription$: Subscription[] = [];

    constructor(private commonControllerService: CommonControllerService,
                private productManagementService: ProductManagementService,
                private route: ActivatedRoute) {
        this.productList = this.route.snapshot.data.productList;
    }

    ngOnInit(): void {
        this.getCustomerObserver();
    }

    getCustomerObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerObserver()
            .subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                }
            })
        );
    }

    trackBy(index, item): void {
        return item.id;
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
