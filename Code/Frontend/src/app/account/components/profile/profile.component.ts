import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {Customer} from '../../../shared/entity/models';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    customer: Customer;
    allowEditProfile = false;

    private subscription$: Subscription;

    constructor(private commonControllerService: CommonControllerService) {
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
        alert('Changes Saved');
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
