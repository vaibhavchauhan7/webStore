import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {CommonService} from '../../services/common.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    sidebarOpen = false;
    private subscription$: Subscription;

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.getSidebarStatus();
    }

    getSidebarStatus(): void {
        this.subscription$ = this.commonService.getSidebarStatus().subscribe({
            next: (data: boolean) => {
                this.sidebarOpen = data;
            }
        });
    }

    toggleSidebar(): void {
        this.sidebarOpen ? this.commonService.closeSidebar() : this.commonService.openSidebar();
    }

    ngOnDestroy(): void {
        this.subscription$?.unsubscribe();
    }

}
