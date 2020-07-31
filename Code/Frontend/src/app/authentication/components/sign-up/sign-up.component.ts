import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Subscription} from "rxjs";

import {AuthenticationService} from "../../services/authentication.service";
import {Customer} from "../../../shared/entity/customer.model";

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

    onSignUp(signUpFormData: NgForm) {
        this.formSubmitted = true;
        this.subscription$ = this._authenticationService.onSignUp(signUpFormData.value)
            .subscribe((data: Customer) => {
                alert('SignUp Successful for Customer: ' + data.name);
            });
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

}
