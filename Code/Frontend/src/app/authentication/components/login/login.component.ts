import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../services/authentication.service';
import {CommonService} from '../../../shared/services/common.service';
import {CookieService} from 'ngx-cookie-service';
import {ProductService} from '../../../product/services/product.service';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {WSClass, WSRouting, WSToast} from '../../../shared/entity/constants';

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
    customerAuthenticated = false;
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
            this.toastService.showToast(`${WSToast.INVALID_CREDENTIALS}`, {classname: `${WSClass.REQUEST_FAILED}`});
        } else {
            this.subscription$.push(this.authenticationService.customerLogin(loginFormData.value)
                .subscribe({
                    next: data => {
                        // TODO: Make JWT Cookie HTTP Only and Secure
                        // Set Cookie - Should be the first line here otherwise lazy loaded components make API calls without JWT
                        this.cookieService.set('token', data.token);
                        this.commonService.setCustomer(data.customer);
                        this.commonService.authenticateCustomer();
                        this.toastService.showToast(`Welcome Back, ${data.customer.firstName} ${data.customer.lastName}`,
                            {classname: `${WSClass.REQUEST_SUCCESS}`});
                        if (this.productService.previousRoute) {
                            this.router.navigateByUrl(`${this.productService.previousRoute}`).then();
                        } else {
                            this.router.navigateByUrl('/').then();
                        }
                    }, error: () => {
                        this.toastService.showToast(`${WSToast.WRONG_CREDENTIALS}`, {classname: `${WSClass.REQUEST_FAILED}`});
                    }
                })
            );
        }
    }

    getCustomerAuthentication(): void {
        this.subscription$.push(this.commonService.getCustomerAuthentication()
            .subscribe({
                next: (data: boolean) => {
                    this.customerAuthenticated = data;
                    if (data) {
                        this.router.navigateByUrl('/').then();
                    }
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription$?.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}
