import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

import {Subscription} from "rxjs";

import {User} from "../../../shared/entity/user.model";
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
                private _router: Router, public _commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
    }

    onLogin(loginFormData: NgForm) {
        sessionStorage.setItem('username', 'tempUser');
        this.formSubmitted = true;
        this.subscription$ = this._authenticationService.onLogin(loginFormData.value)
            .subscribe((data: User) => {
                this._authenticationService.isUserAuthenticated = true;
                this._router.navigate(['/']);
            });
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

}
