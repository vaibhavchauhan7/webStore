import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Customer} from '../../../shared/entity/models';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    routes = {
        account: WSRouting.ACCOUNT,
        cart: WSRouting.CART,
        orders: WSRouting.ORDERS,
        wishlist: WSRouting.WISHLIST
    };

    customer: Customer;
    allowEditProfile = false;

    private subscription$: Subscription[] = [];

    constructor(private accountService: AccountService,
                private commonService: CommonService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomer();
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.customer = customer;
                }
            })
        );
    }

    saveEditedProfile(editProfileData: NgForm): void {
        editProfileData.value.id = +editProfileData.value.id;
        if (editProfileData.value.firstName !== '' && editProfileData.value.lastName !== ''
            && editProfileData.value.email !== '' && editProfileData.value.phone !== '') {
            // TODO: Stabilize Profile Update with Verification Conditions
            this.subscription$.push(this.accountService.updateProfile(editProfileData.value)
                .subscribe((customer: Customer) => {
                    this.commonService.setCustomer(customer);
                    this.toggleEditProfile();
                    this.toastService.showToast('Changes Saved!', {classname: 'bg-success'});
                }, () => {
                    this.toastService.showToast(`Couldn't Update Profile!`, {classname: 'bg-red'});
                })
            );
        } else {
            this.toastService.showToast(`Invalid Profile Data!`, {classname: 'bg-red'});
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
