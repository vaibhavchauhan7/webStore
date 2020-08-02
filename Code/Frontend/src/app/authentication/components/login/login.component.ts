import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

import {Subscription} from "rxjs";

import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    subscription$: Subscription;
    private formSubmitted = false;

    constructor(private _authenticationService: AuthenticationService,
                private _router: Router) {
    }

    ngOnInit(): void {
    }

    customerLogin(loginFormData: NgForm) {
        this.formSubmitted = true;
        this.subscription$ = this._authenticationService.customerLogin(loginFormData.value)
            .subscribe((data) => {
                localStorage.setItem("token", Object.values(data)[0]);
                this._authenticationService.isCustomerAuthenticated = true;
                this._router.navigate(['/']);
            });
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
