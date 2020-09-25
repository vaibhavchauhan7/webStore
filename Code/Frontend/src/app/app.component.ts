import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AuthenticationService} from './authentication/services/authentication.service';
import {CommonControllerService} from './shared/services/common-controller.service';
import {CookieService} from 'ngx-cookie-service';
import {Customer} from './shared/entity/models';
import {SidebarService} from './shared/components/sidebar/sidebar.service';

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
                private commonControllerService: CommonControllerService,
                private cookieService: CookieService,
                private router: Router,
                private sidebarService: SidebarService,
                private titleService: Title) {
    }

    ngOnInit(): void {
        this.checkCustomerAuthentication();
        this.getPageTitle();
        this.getSidebarObserver();
    }

    checkCustomerAuthentication(): void {
        const tokenCookie = this.cookieService.get('token');
        if (tokenCookie) {
            this.getCustomerDataByToken(tokenCookie);
        }
    }

    getCustomerDataByToken(tokenCookie): void {
        this.subscription$.push(this.authenticationService.getCustomerDataByToken(tokenCookie)
            .subscribe((customer: Customer) => {
                if (customer && Object.keys(customer).length !== 0) {
                    this.commonControllerService.setCustomerData(customer);
                    this.commonControllerService.authenticateCustomer();
                }
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
