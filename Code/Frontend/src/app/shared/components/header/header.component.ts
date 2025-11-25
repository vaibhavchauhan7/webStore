import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';

import {Subscription} from 'rxjs';

import {CommonService} from '../../services/common.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [
        NgClass
    ],
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    sidebarOpen: boolean = false;
    private subscription$: Subscription;

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.getSidebarStatus();
    }

    getSidebarStatus(): void {
        this.subscription$ = this.commonService.getSidebarStatus().subscribe({
            next: (data: boolean): void  => {
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
