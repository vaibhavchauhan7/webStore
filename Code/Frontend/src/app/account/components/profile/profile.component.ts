import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {Customer} from '../../../shared/entity/models';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WebStoreRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    routes = {
        account: WebStoreRouting.ACCOUNT,
        cart: WebStoreRouting.CART,
        orders: WebStoreRouting.ORDERS,
        wishlist: WebStoreRouting.WISHLIST
    };

    customer: Customer;
    allowEditProfile = false;

    private subscription$: Subscription;

    constructor(private commonControllerService: CommonControllerService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerObserver();
    }

    getCustomerObserver(): void {
        this.subscription$ = this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
            if (customer && Object.keys(customer).length !== 0) {
                this.customer = customer;
            }
        });
    }

    saveEditedProfile(editProfileData: NgForm): void {
        this.toastService.showToast('Profile Updated!', {classname: 'bg-success'});
        this.toggleEditProfile();
    }

    toggleEditProfile(): void {
        this.allowEditProfile = !this.allowEditProfile;
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
