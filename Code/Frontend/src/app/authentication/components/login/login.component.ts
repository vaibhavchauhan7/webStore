import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

import {Subscription} from "rxjs";

import {AuthenticationService} from "../../services/authentication.service";
import {CommonControllerService} from "../../../shared/services/common-controller.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    subscription$: Subscription;
    private formSubmitted = false;

    constructor(private _authenticationService: AuthenticationService,
                private _commonControllerService: CommonControllerService,
                private _router: Router) {
    }

    ngOnInit(): void {
    }

    customerLogin(loginFormData: NgForm) {
        this.formSubmitted = true;
        this.subscription$ = this._authenticationService.customerLogin(loginFormData.value).subscribe(data => {
            this._commonControllerService.customer.name = data['customer'].name;
            sessionStorage.setItem('token', data['token']);
            this._authenticationService.isCustomerAuthenticated = true;
            this._router.navigate(['/']);
        }, () => {
            alert("Wrong Email / Password Combination");
        });
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
