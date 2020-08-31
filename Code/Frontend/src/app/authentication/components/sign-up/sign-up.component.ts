import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WebStoreRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    login = WebStoreRouting.LOGIN;

    private subscription$: Subscription;

    constructor(private toastService: ToastService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    customerSignUp(signUpFormData: NgForm): void {
        if (signUpFormData.invalid || signUpFormData.untouched) {
            this.toastService.showToast('Invalid Data!', {classname: 'bg-red'});
        } else {
            this.subscription$ = this.authenticationService.customerSignUp(signUpFormData.value).subscribe(() => {
                    this.toastService.showToast('Sign Up Successful!', {classname: 'bg-success'});
                    signUpFormData.reset();
                }, () => {
                    this.toastService.showToast('Something Went Wrong - Sign Up Failed!', {classname: 'bg-red'});
                }
            );
        }
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
