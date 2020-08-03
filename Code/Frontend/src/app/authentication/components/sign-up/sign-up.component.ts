import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    subscription$: Subscription;
    private formSubmitted = false;

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    customerSignUp(signUpFormData: NgForm): void {
        this.formSubmitted = true;
        this.subscription$ = this.authenticationService.customerSignUp(signUpFormData.value).subscribe(() => {
                alert('Sign Up Successful!');
            }, error => {
                alert(`An Error Occurred: ${error}`);
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
