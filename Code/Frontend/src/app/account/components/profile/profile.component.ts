import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
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

    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonControllerService: CommonControllerService,
                private toastService: ToastService) {
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

    saveEditedProfile(editProfileData: NgForm): void {
        editProfileData.value.id = +editProfileData.value.id;
        if (editProfileData.value.firstName !== '' || editProfileData.value.lastName !== ''
            || editProfileData.value.email !== '' || editProfileData.value.phone !== '') {
            // TODO: Stabilize Profile Update with Verification Conditions
            this.subscription$.push(this.accountService.updateCustomerProfile(editProfileData.value)
                .subscribe((customer: Customer) => {
                    this.commonControllerService.setCustomerData(customer);
                    this.toggleEditProfile();
                    this.toastService.showToast('Profile Updated!', {classname: 'bg-success'});
                }, () => {
                    this.toastService.showToast(`Couldn't Update Profile!`,
                        {classname: 'bg-red'});
                })
            );
        } else {
            this.toastService.showToast(`Couldn't Update Empty Fields!`, {classname: 'bg-red'});
        }
    }

    toggleEditProfile(): void {
        this.allowEditProfile = !this.allowEditProfile;
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
