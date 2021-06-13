import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {SidebarService} from '../sidebar/sidebar.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isSidebarOpen: boolean;

    private subscription$: Subscription;

    constructor(private sidebarService: SidebarService) {
    }

    ngOnInit(): void {
        this.getSidebarObserver();
    }

    getSidebarObserver(): void {
        this.subscription$ = this.sidebarService.getSidebarObserver().subscribe((data: boolean) => {
            this.isSidebarOpen = data;
        });
    }

    toggleSidebar(): void {
        if (this.isSidebarOpen) {
            this.sidebarService.closeSidebar();
        } else {
            this.sidebarService.openSidebar();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

}
