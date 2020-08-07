import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AuthenticationService} from './authentication/services/authentication.service';
import {CommonControllerService} from './shared/services/common-controller.service';
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

    constructor(private router: Router,
                private titleService: Title,
                private sidebarService: SidebarService,
                private activatedRoute: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.getPageTitle();
        this.checkAuthentication();
        this.getSidebarObserver();
        this.openPageFromTop();
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

    checkAuthentication(): void {
        if ('token' in localStorage) {
            this.commonControllerService.authenticateCustomer();
            this.subscription$.push(this.authenticationService.getCustomerByEmail(localStorage.getItem('token'))
                .subscribe((customer: Customer) => {
                    this.commonControllerService.setCustomerData(customer);
                })
            );
        }
    }

    getSidebarObserver(): void {
        this.sidebarService.getSidebarObserver().subscribe((data: boolean) => {
            this.isSidebarOpen = data;
        });
    }

    // For every router page to open from top
    openPageFromTop(): void {
        this.subscription$.push(this.router.events.subscribe(event => {
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
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
