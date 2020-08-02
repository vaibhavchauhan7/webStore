import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Subscription} from "rxjs";

import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

    subscription$: Subscription;
    private formSubmitted = false;

    constructor(private _authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    customerSignUp(signUpFormData: NgForm) {
        this.formSubmitted = true;
        this.subscription$ = this._authenticationService.customerSignUp(signUpFormData.value)
            .subscribe((data) => {
                alert("Sign Up Successful!");
            });
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
