import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {WebStoreRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    signUpRoute = WebStoreRouting.SIGN_UP;
    isCustomerAuthenticated: boolean;

    private formSubmitted = false;
    private subscription$: Subscription;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthenticationObserver();
    }

    customerLogin(loginFormData: NgForm): void {
        this.formSubmitted = true;
        this.subscription$ = this.authenticationService.customerLogin(loginFormData.value).subscribe(data => {
            this.commonControllerService.setCustomerData(data.customer);
            localStorage.setItem('token', data.token);
            this.commonControllerService.authenticateCustomer();
            this.router.navigate(['/']);
        }, () => {
            alert('Wrong Email or Password');
        });
    }

    getCustomerAuthenticationObserver(): void {
        this.commonControllerService.getCustomerAuthenticationObserver().subscribe((data: boolean) => {
            this.isCustomerAuthenticated = data;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
