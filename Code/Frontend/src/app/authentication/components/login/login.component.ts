import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonControllerService} from '../../../shared/services/common-controller.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    subscription$: Subscription;
    private formSubmitted = false;

    constructor(private authenticationService: AuthenticationService,
                private commonControllerService: CommonControllerService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    customerLogin(loginFormData: NgForm): void {
        this.formSubmitted = true;
        this.subscription$ = this.authenticationService.customerLogin(loginFormData.value).subscribe(data => {
            this.commonControllerService.customer.name = data.customer.name;
            sessionStorage.setItem('token', data.token);
            this.authenticationService.isCustomerAuthenticated = true;
            this.router.navigate(['/']);
        }, () => {
            alert('Wrong Email / Password Combination');
        });
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
