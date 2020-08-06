import {Component, OnInit} from '@angular/core';

import {SidebarService} from '../sidebar/sidebar.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isSidebarOpen: boolean;

    constructor(private sidebarService: SidebarService) {
    }

    ngOnInit(): void {
        this.getSidebarObserver();
    }

    getSidebarObserver(): void {
        this.sidebarService.getSidebarObserver().subscribe((data: boolean) => {
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
}
