import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Customer} from '../../../shared/entity/models';
import {CommonControllerService} from '../../../shared/services/common-controller.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    customer: Customer;
    allowEditProfile = false;

    constructor(private commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.getCustomerProfile();
    }

    getCustomerProfile(): void {
        this.commonControllerService.getCustomerObserver().subscribe((customer: Customer) => {
            this.customer = customer;
        });
    }

    saveEditedProfile(editProfileData: NgForm): void {
        alert('Changes Saved');
        this.toggleEditProfile();
    }

    toggleEditProfile(): void {
        this.allowEditProfile = !this.allowEditProfile;
    }
}
