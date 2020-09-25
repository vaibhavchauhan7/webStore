import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonControllerService} from '../../../shared/services/common-controller.service';
import {CookieService} from 'ngx-cookie-service';
import {ProductManagementService} from '../../../product/services/product-management.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WebStoreRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    signUp = WebStoreRouting.SIGN_UP;
    isCustomerAuthenticated: boolean;

    private subscription$: Subscription[] = [];

    constructor(private authenticationService: AuthenticationService,
                private commonControllerService: CommonControllerService,
                private cookieService: CookieService,
                private productManagementService: ProductManagementService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthenticationObserver();
    }

    customerLogin(loginFormData: NgForm): void {
        if (loginFormData.invalid || loginFormData.untouched) {
            this.toastService.showToast('Invalid Credentials!', {classname: 'bg-red'});
        } else {
            this.subscription$.push(this.authenticationService.customerLogin(loginFormData.value)
                .subscribe(data => {
                    // TODO: Make JWT Cookie HTTP Only and Secure
                    // Set Cookie - Should be the first line here otherwise lazy loaded components make API calls without JWT
                    this.cookieService.set('token', data.token);
                    this.commonControllerService.setCustomerData(data.customer);
                    this.commonControllerService.authenticateCustomer();
                    this.toastService.showToast(`Welcome Back, ${data.customer.firstName}`, {classname: 'bg-success'});
                    if (this.productManagementService.previousRoute) {
                        this.router.navigateByUrl(`${this.productManagementService.previousRoute}`).then();
                    } else {
                        this.router.navigateByUrl('/').then();
                    }
                }, () => {
                    this.toastService.showToast('Wrong Email / Password', {classname: 'bg-red'});
                })
            );
        }
    }

    getCustomerAuthenticationObserver(): void {
        this.subscription$.push(this.commonControllerService.getCustomerAuthenticationObserver()
            .subscribe((data: boolean) => {
                this.isCustomerAuthenticated = data;
                if (data) {
                    this.router.navigateByUrl('/').then();
                }
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
