import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {WebStoreRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    loginRoute = WebStoreRouting.LOGIN;

    private formSubmitted = false;
    private subscription$: Subscription;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    customerSignUp(signUpFormData: NgForm): void {
        this.formSubmitted = true;
        this.subscription$ = this.authenticationService.customerSignUp(signUpFormData.value).subscribe(() => {
                alert('Sign Up Successful!');
            }, () => {
                alert(`Sign Up Failed!`);
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
