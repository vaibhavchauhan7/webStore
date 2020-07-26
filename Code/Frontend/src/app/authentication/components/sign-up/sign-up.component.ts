import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Subscription} from "rxjs";

import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../../shared/entity/user.model";

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
            .subscribe((data: User) => {
                alert('SignUp Successful for User: ' + data.name);
            });
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

}
