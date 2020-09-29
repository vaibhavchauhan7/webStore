import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WebStoreRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    login = WebStoreRouting.LOGIN;

    customerEmail: string;
    isCustomerAuthenticated: boolean;

    forgotPasswordForm = true;
    updatePasswordForm = false;

    private subscription$: Subscription[] = [];

    constructor(private authenticationService: AuthenticationService,
                private commonControllerService: CommonControllerService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthenticationObserver();
    }

    forgotPassword(forgotPasswordFormData: NgForm): void {
        this.customerEmail = forgotPasswordFormData.value.email;
        if (forgotPasswordFormData.invalid || forgotPasswordFormData.untouched) {
            this.toastService.showToast('Invalid Credentials!', {classname: 'bg-red'});
        } else {
            this.subscription$.push(this.authenticationService.forgotPassword(forgotPasswordFormData.value)
                .subscribe((data: boolean) => {
                    if (data) {
                        this.forgotPasswordForm = false;
                        this.updatePasswordForm = true;
                    } else {
                        this.toastService.showToast('Wrong Email / Phone', {classname: 'bg-red'});
                    }
                }, () => {
                    this.toastService.showToast('Wrong Email / Phone', {classname: 'bg-red'});
                })
            );
        }
    }

    updatePassword(updatePasswordFormData: NgForm): void {
        updatePasswordFormData.value.email = this.customerEmail;
        if (updatePasswordFormData.invalid || updatePasswordFormData.untouched) {
            this.toastService.showToast('Invalid Credentials!', {classname: 'bg-red'});
        } else {
            if (updatePasswordFormData.value.password === updatePasswordFormData.value.confirmPassword) {
                this.subscription$.push(this.authenticationService.updatePassword(updatePasswordFormData.value)
                    .subscribe(() => {
                        this.forgotPasswordForm = true;
                        this.updatePasswordForm = false;
                        this.toastService.showToast(`Password Changed - Please Login!`, {classname: 'bg-success'});
                        this.router.navigateByUrl('/login').then();
                    }, () => {
                        this.toastService.showToast(`Couldn't Update Password - Try Again Later!`, {classname: 'bg-red'});
                    })
                );
            } else {
                this.toastService.showToast('Passwords Do Not Match!', {classname: 'bg-red'});
            }
        }
    }

    getCustomerAuthenticationObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerAuthenticationObserver()
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
