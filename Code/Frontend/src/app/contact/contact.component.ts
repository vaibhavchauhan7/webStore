import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {CommonService} from '../shared/services/common.service';
import {ContactService} from './contact.service';
import {Customer} from '../shared/entity/models';
import {ToastService} from '../shared/components/toast/toast.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

    @ViewChild('contactName') contactName;
    @ViewChild('contactEmail') contactEmail;

    customer: Customer;
    isCustomerAuthenticated: boolean;

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
                this.isCustomerAuthenticated = data;
            })
        );
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

    customerContact(contactFormData: NgForm): void {
        if (contactFormData.invalid || contactFormData.untouched) {
            this.toastService.showToast('Invalid Data!', {classname: 'bg-red'});
        } else {
            if (this.isCustomerAuthenticated && contactFormData.value.name === null && contactFormData.value.email === null) {
                contactFormData.value.name = this.customer.firstName + ' ' + this.customer.lastName;
                contactFormData.value.email = this.customer.email;
            }
            this.subscription$.push(this.contactService.customerContact(contactFormData.value)
                .subscribe(() => {
                        this.toastService.showToast('Form Successfully Submitted!', {classname: 'bg-success'});
                        contactFormData.reset();
                        if (this.isCustomerAuthenticated) {
                            this.contactName.nativeElement.value = this.customer.firstName + ' ' + this.customer.lastName;
                            this.contactEmail.nativeElement.value = this.customer.email;
                        }
                    }, () => {
                        this.toastService.showToast('Something Went Wrong - Form Not Submitted', {classname: 'bg-red'});
                    }
                )
            );
        }
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
