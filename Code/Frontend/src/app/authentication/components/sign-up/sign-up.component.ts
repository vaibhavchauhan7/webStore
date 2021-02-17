import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonService} from '../../../shared/services/common.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    login = WSRouting.LOGIN;
    isCustomerAuthenticated: boolean;

    private subscription$: Subscription[] = [];

    constructor(private authenticationService: AuthenticationService,
                private commonService: CommonService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthentication();
    }

    customerSignUp(signUpFormData: NgForm): void {
        if (signUpFormData.invalid || signUpFormData.untouched) {
            this.toastService.showToast('Invalid Data!', {classname: 'bg-red'});
        } else {
            if (signUpFormData.value.password === signUpFormData.value.confirmPassword) {
                this.subscription$.push(this.authenticationService.customerSignUp(signUpFormData.value).subscribe(() => {
                        this.toastService.showToast('Sign Up Successful!', {classname: 'bg-success'});
                        signUpFormData.reset();
                        this.router.navigateByUrl(`${WSRouting.LOGIN}`).then();
                        // TODO : Auto-Login after Successful Sign-Up
                    }, () => {
                        this.toastService.showToast('Something Went Wrong - Sign Up Failed!', {classname: 'bg-red'});
                    })
                );
            } else {
                this.toastService.showToast('Confirm Password Does Not Match Password!', {classname: 'bg-red'});
            }
        }
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe((data: boolean) => {
                this.isCustomerAuthenticated = data;
                if (this.isCustomerAuthenticated) {
                    this.router.navigateByUrl('/').then();
                }
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
