import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonService} from '../../../shared/services/common.service';
import {CookieService} from 'ngx-cookie-service';
import {ProductService} from '../../../product/services/product.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSRouting} from '../../../shared/entity/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    routes = {
        signUp: WSRouting.SIGN_UP,
        forgot: WSRouting.FORGOT
    };
    isCustomerAuthenticated: boolean;

    private subscription$: Subscription[] = [];

    constructor(private authenticationService: AuthenticationService,
                private commonService: CommonService,
                private cookieService: CookieService,
                private productService: ProductService,
                private router: Router,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.getCustomerAuthentication();
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
                    this.commonService.setCustomer(data.customer);
                    this.commonService.authenticateCustomer();
                    this.toastService.showToast(`Welcome Back, ${data.customer.firstName} ${data.customer.lastName}`,
                        {classname: 'bg-success'});
                    if (this.productService.previousRoute) {
                        this.router.navigateByUrl(`${this.productService.previousRoute}`).then();
                    } else {
                        this.router.navigateByUrl('/').then();
                    }
                }, () => {
                    this.toastService.showToast('Wrong Email / Password', {classname: 'bg-red'});
                })
            );
        }
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
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
