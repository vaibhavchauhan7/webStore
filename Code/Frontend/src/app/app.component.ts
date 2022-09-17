import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AuthenticationService} from './authentication/services/authentication.service';
import {CommonService} from './shared/services/common.service';
import {CookieService} from 'ngx-cookie-service';
import {Customer} from './shared/entity/models';
import {ToastService} from './shared/components/toast/toast.service';
import {WSClass, WSTitle, WSToast} from './shared/entity/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title = WSTitle.WEB_STORE;
    sidebarOpen = false;
    private subscription$: Subscription[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private commonService: CommonService,
                private cookieService: CookieService,
                private router: Router,
                private titleService: Title,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.validateCustomerAuthentication();
        this.getPageTitle();
        this.getSidebarStatus();
    }

    validateCustomerAuthentication(): void {
        if (this.cookieService.get('token')) {
            this.getAuthenticatedCustomer();
        } else {
            this.subscription$.push(this.authenticationService.customerLogout().subscribe());
        }
    }

    getAuthenticatedCustomer(): void {
        this.subscription$.push(this.authenticationService.getAuthenticatedCustomer()
            .subscribe({
                next: (customer: Customer) => {
                    if (customer && Object.keys(customer).length > 0) {
                        this.commonService.setCustomer(customer);
                        this.commonService.authenticateCustomer();
                    }
                }, error: () => {
                    this.toastService.showToast(`${WSToast.TRY_AGAIN}`, {classname: `${WSClass.REQUEST_FAILED}`});
                }
            })
        );
    }

    getPageTitle(): void {
        this.subscription$.push(this.router.events.pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => {
                    let child = this.activatedRoute.firstChild;
                    while (child.firstChild) {
                        child = child.firstChild;
                    }
                    if (child.snapshot.data.title) {
                        return child.snapshot.data.title;
                    }
                    return this.titleService.getTitle();
                })).subscribe({
                next: (title: string) => {
                    this.titleService.setTitle(title);
                }
            })
        );
    }

    getSidebarStatus(): void {
        this.subscription$.push(this.commonService.getSidebarStatus()
            .subscribe({
                next: (data: boolean) => {
                    this.sidebarOpen = data;
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
