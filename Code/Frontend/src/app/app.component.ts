import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

import {AuthenticationService} from "./authentication/services/authentication.service";
import {CommonControllerService} from "./shared/services/common-controller.service";
import {Customer} from "./shared/entity/customer.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    title: string = 'webStore';
    subscription$: Subscription[] = [];

    constructor(private _router: Router,
                private _titleService: Title,
                private _activatedRoute: ActivatedRoute,
                private _authenticationService: AuthenticationService,
                public _commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.openPageFromTop();
        this.getPageTitle();
        this.checkAuthentication();
    }

    checkAuthentication() {
        if ('token' in sessionStorage) {
            this._authenticationService.isCustomerAuthenticated = true;
            this.subscription$.push(this._authenticationService.getCustomerByEmail(sessionStorage.getItem('token'))
                .subscribe((customer: Customer) => {
                    this._commonControllerService.customer = customer;
                })
            );
        }
    }

    openPageFromTop() {
        // For every router page to open from top
        this.subscription$.push(this._router.events.subscribe(event => {
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            })
        );
    }

    getPageTitle() {
        const appTitle = this._titleService.getTitle();
        this.subscription$.push(this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => {
                    let child = this._activatedRoute.firstChild;
                    while (child.firstChild) {
                        child = child.firstChild;
                    }
                    if (child.snapshot.data['title']) {
                        return child.snapshot.data['title'];
                    }
                    return appTitle;
                })
            ).subscribe((title: string) => {
                this._titleService.setTitle(title);
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.forEach(subscription => {
                subscription.unsubscribe();
            })
        }
    }
}
