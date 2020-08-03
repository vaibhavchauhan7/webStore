import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AuthenticationService} from './authentication/services/authentication.service';
import {CommonControllerService} from './shared/services/common-controller.service';
import {Customer} from './shared/entity/customer.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'webStore';
    subscription$: Subscription[] = [];

    constructor(private router: Router,
                private titleService: Title,
                private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                public commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.openPageFromTop();
        this.getPageTitle();
        this.checkAuthentication();
    }

    checkAuthentication(): void {
        if ('token' in sessionStorage) {
            this.authenticationService.isCustomerAuthenticated = true;
            this.subscription$.push(this.authenticationService.getCustomerByEmail(sessionStorage.getItem('token'))
                .subscribe((customer: Customer) => {
                    this.commonControllerService.customer = customer;
                })
            );
        }
    }

    openPageFromTop(): void {
        // For every router page to open from top
        this.subscription$.push(this.router.events.subscribe(event => {
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
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

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            });
        }
    }
}
