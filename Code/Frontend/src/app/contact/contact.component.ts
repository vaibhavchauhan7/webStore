import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {CommonService} from '../shared/services/common.service';
import {ContactService} from './contact.service';
import {Customer} from '../shared/entity/models';
import {ToastService} from '../shared/components/toast/toast.service';
import {WSClass, WSToast} from '../shared/entity/constants';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

    @ViewChild('contactName') contactName;
    @ViewChild('contactEmail') contactEmail;
    customer = {} as Customer;
    customerAuthenticated = false;
    private subscription$: Subscription[] = [];

    constructor(private commonService: CommonService,
                private contactService: ContactService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthentication();
        this.getCustomer();
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe((data: boolean) => {
                this.customerAuthenticated = data;
            })
        );
    }

    getCustomer(): void {
        this.subscription$.push(this.commonService.getCustomer()
            .subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length > 0) {
                    this.customer = customer;
                }
            })
        );
    }

    customerContact(contactFormData: NgForm): void {
        if (contactFormData.invalid || contactFormData.untouched) {
            this.toastService.showToast(`${WSToast.INVALID_DATA}`, {classname: `${WSClass.REQUEST_FAILED}`});
        } else {
            if (this.customerAuthenticated && contactFormData.value.name === null && contactFormData.value.email === null) {
                contactFormData.value.name = this.customer.firstName + ' ' + this.customer.lastName;
                contactFormData.value.email = this.customer.email;
            }
            this.subscription$.push(this.contactService.customerContact(contactFormData.value)
                .subscribe(() => {
                        this.toastService.showToast(`${WSToast.FORM_SUBMITTED}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                        contactFormData.reset();
                        if (this.customerAuthenticated) {
                            this.contactName.nativeElement.value = this.customer.firstName + ' ' + this.customer.lastName;
                            this.contactEmail.nativeElement.value = this.customer.email;
                        }
                    }, () => {
                        this.toastService.showToast(`${WSToast.FORM_NOT_SUBMITTED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                )
            );
        }
    }

    ngOnDestroy(): void {
        this.subscription$?.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

}
