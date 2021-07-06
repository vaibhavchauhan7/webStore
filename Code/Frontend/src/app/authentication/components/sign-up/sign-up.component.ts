import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonService} from '../../../shared/services/common.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSClass, WSRouting, WSToast} from '../../../shared/entity/constants';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    login = WSRouting.LOGIN;
    customerAuthenticated = false;
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
            this.toastService.showToast(`${WSToast.INVALID_DATA}`, {classname: `${WSClass.REQUEST_FAILED}`});
        } else {
            if (signUpFormData.value.password === signUpFormData.value.confirmPassword) {
                this.subscription$.push(this.authenticationService.customerSignUp(signUpFormData.value).subscribe(() => {
                        this.toastService.showToast(`${WSToast.SIGN_UP_SUCCESSFUL}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                        signUpFormData.reset();
                        this.router.navigateByUrl(`${WSRouting.LOGIN}`).then();
                        // TODO : Auto-Login after Successful Sign-Up
                    }, () => {
                        this.toastService.showToast(`${WSToast.SIGN_UP_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    })
                );
            } else {
                this.toastService.showToast(`${WSToast.CONFIRM_PASSWORD_DOES_NOT_MATCH}`, {classname: `${WSClass.REQUEST_FAILED}`});
            }
        }
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe((data: boolean) => {
                this.customerAuthenticated = data;
                if (this.customerAuthenticated) {
                    this.router.navigateByUrl('/').then();
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription$?.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
