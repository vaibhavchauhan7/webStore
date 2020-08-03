import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {CommonControllerService} from '../../services/common-controller.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public commonControllerService: CommonControllerService,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        // this.commonControllerService.getSidebarObserver().subscribe((status: boolean) => {
        //     this.commonControllerService.isSidebarOpen = status === true;
        //     this.changeDetectorRef.detectChanges();
        // });
    }

    toggleSidebar(): void {
        this.commonControllerService.toggleSidebar();
    }
}
