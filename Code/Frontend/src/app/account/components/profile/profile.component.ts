import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {NgForm} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {Subscription} from 'rxjs';

import {AccountService} from '../../account.service';
import {CommonService} from '../../../shared/services/common.service';
import {Customer} from '../../../shared/entity/models';
import {SharedModule} from '../../../shared.module';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSClass, WSRouting, WSToast} from '../../../shared/entity/constants';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    imports: [
        SharedModule,
        RouterLink,
        NgOptimizedImage,
        RouterLinkActive
    ],
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    routes = {
        account: WSRouting.ACCOUNT,
        cart: WSRouting.CART,
        orders: WSRouting.ORDERS,
        wishlist: WSRouting.WISHLIST
    };
    customer: Customer = {} as Customer;
    allowEditProfile: boolean = false;
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
            .subscribe({
                next: (customer: Customer): void => {
                    if (customer && Object.keys(customer).length > 0) this.customer = customer;
                }
            })
        );
    }

    saveEditedProfile(customerProfile: NgForm): void {
        customerProfile.value.id = +customerProfile.value.id;
        if (customerProfile.value.firstName !== '' && customerProfile.value.lastName !== ''
            && customerProfile.value.email !== '' && customerProfile.value.phone !== '') {
            // TODO: Stabilize Profile Update with Verification Conditions
            this.subscription$.push(this.accountService.updateProfile(customerProfile.value)
                .subscribe({
                    next: (customer: Customer): void => {
                        this.commonService.setCustomer(customer);
                        this.toggleEditProfile();
                        this.toastService.showToast(`${WSToast.CHANGES_SAVED}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                    }, error: (): void => {
                        this.toastService.showToast(`${WSToast.PROFILE_UPDATE_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        } else {
            this.toastService.showToast(`${WSToast.INVALID_DATA}`, {classname: `${WSClass.REQUEST_FAILED}`});
        }
    }

    toggleEditProfile(): void {
        this.allowEditProfile = !this.allowEditProfile;
    }

    ngOnDestroy(): void {
        this.subscription$?.forEach((subscription: Subscription): void => {
            subscription.unsubscribe();
        });
    }

}
