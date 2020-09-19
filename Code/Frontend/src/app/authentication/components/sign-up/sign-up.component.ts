import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WebStoreRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    login = WebStoreRouting.LOGIN;
    isCustomerAuthenticated: boolean;

    private subscription$: Subscription;

    constructor(private authenticationService: AuthenticationService,
                private commonControllerService: CommonControllerService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthenticationObserver();
    }

    customerSignUp(signUpFormData: NgForm): void {
        if (signUpFormData.invalid || signUpFormData.untouched) {
            this.toastService.showToast('Invalid Data!', {classname: 'bg-red'});
        } else {
            this.subscription$ = this.authenticationService.customerSignUp(signUpFormData.value).subscribe(() => {
                    this.toastService.showToast('Sign Up Successful!', {classname: 'bg-success'});
                    signUpFormData.reset();
                    this.router.navigateByUrl(`${WebStoreRouting.LOGIN}`).then();
                    // TODO : Auto-Login after Successful Sign-Up
                }, () => {
                    this.toastService.showToast('Something Went Wrong - Sign Up Failed!', {classname: 'bg-red'});
                }
            );
        }
    }

    getCustomerAuthenticationObserver(): void {
        this.commonControllerService.getCustomerAuthenticationObserver().subscribe((data: boolean) => {
            this.isCustomerAuthenticated = data;
            if (this.isCustomerAuthenticated) {
                this.router.navigateByUrl('/').then();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
