import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonService} from '../../../shared/services/common.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSClass, WSRouting, WSToast} from '../../../shared/entity/constants';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    login = WSRouting.LOGIN;
    customerEmail = '';
    customerAuthenticated = false;
    forgotPasswordForm = true;
    updatePasswordForm = false;
    private subscription$: Subscription[] = [];

    constructor(private authenticationService: AuthenticationService,
                private commonService: CommonService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthentication();
    }

    forgotPassword(forgotPasswordFormData: NgForm): void {
        this.customerEmail = forgotPasswordFormData.value.email;
        if (forgotPasswordFormData.invalid || forgotPasswordFormData.untouched) {
            this.toastService.showToast(`${WSToast.INVALID_CREDENTIALS}`, {classname: `${WSClass.REQUEST_FAILED}`});
        } else {
            this.subscription$.push(this.authenticationService.forgotPassword(forgotPasswordFormData.value)
                .subscribe({
                    next: (data: boolean) => {
                        if (data) {
                            this.forgotPasswordForm = false;
                            this.updatePasswordForm = true;
                        } else {
                            this.toastService.showToast(`${WSToast.WRONG_CREDENTIALS}`, {classname: `${WSClass.REQUEST_FAILED}`});
                        }
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.WRONG_CREDENTIALS}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    updatePassword(updatePasswordFormData: NgForm): void {
        updatePasswordFormData.value.email = this.customerEmail;
        if (updatePasswordFormData.invalid || updatePasswordFormData.untouched) {
            this.toastService.showToast(`${WSToast.INVALID_CREDENTIALS}`, {classname: `${WSClass.REQUEST_FAILED}`});
        } else {
            if (updatePasswordFormData.value.password === updatePasswordFormData.value.confirmPassword) {
                this.subscription$.push(this.authenticationService.updatePassword(updatePasswordFormData.value)
                    .subscribe({
                        next: () => {
                            this.forgotPasswordForm = true;
                            this.updatePasswordForm = false;
                            this.toastService.showToast(`${WSToast.PASSWORD_UPDATED}`, {classname: `${WSClass.REQUEST_SUCCESS}`});
                            this.router.navigateByUrl(`/${this.login}`).then();
                        }, error: () => {
                            this.toastService.showToast(`${WSToast.PASSWORD_UPDATE_FAILED}`, {classname: `${WSClass.REQUEST_FAILED}`});
                        }
                    })
                );
            } else {
                this.toastService.showToast(`${WSToast.PASSWORDS_DO_NOT_MATCH}`, {classname: `${WSClass.REQUEST_FAILED}`});
            }
        }
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe({
                next: (data: boolean) => {
                    this.customerAuthenticated = data;
                    if (this.customerAuthenticated) {
                        this.router.navigateByUrl('/').then();
                    }
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
