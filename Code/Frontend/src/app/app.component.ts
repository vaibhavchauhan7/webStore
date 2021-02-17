import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AuthenticationService} from './authentication/services/authentication.service';
import {CommonService} from './shared/services/common.service';
import {CookieService} from 'ngx-cookie-service';
import {Customer} from './shared/entity/models';
import {ProductService} from './product/services/product.service';
import {SidebarService} from './shared/components/sidebar/sidebar.service';
import {ToastService} from './shared/components/toast/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'webStore';
    isSidebarOpen: boolean;

    private subscription$: Subscription[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private commonService: CommonService,
                private cookieService: CookieService,
                private productService: ProductService,
                private router: Router,
                private sidebarService: SidebarService,
                private titleService: Title,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.checkCustomerAuthentication();
        this.getPageTitle();
        this.getSidebarObserver();
    }

    checkCustomerAuthentication(): void {
        const tokenCookie = this.cookieService.get('token');
        if (tokenCookie) {
            this.getAuthenticatedCustomer();
        } else {
            this.authenticationService.customerLogout().subscribe();
        }
    }

    getAuthenticatedCustomer(): void {
        this.subscription$.push(this.authenticationService.getAuthenticatedCustomer()
            .subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.commonService.setCustomer(customer);
                    this.commonService.authenticateCustomer();
                }
            }, () => {
                this.toastService.showToast(`Error Occurred - Please Try Again Later!`, {classname: 'bg-red'});
            })
        );
    }

    getPageTitle(): void {
        const appTitle = this.titleService.getTitle();
        this.subscription$.push(this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => {
                    let child = this.activatedRoute.firstChild;
                    while (child.firstChild) {
                        child = child.firstChild;
                    }
                    if (child.snapshot.data.title) {
                        return child.snapshot.data.title;
                    }
                    return appTitle;
                })
            ).subscribe((title: string) => {
                this.titleService.setTitle(title);
            })
        );
    }

    getSidebarObserver(): void {
        this.subscription$.push(this.sidebarService.getSidebarObserver().subscribe((data: boolean) => {
                this.isSidebarOpen = data;
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
