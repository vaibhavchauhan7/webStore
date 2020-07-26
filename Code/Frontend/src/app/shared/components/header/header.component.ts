import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {CommonControllerService} from "../../services/common-controller.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public _commonControllerService: CommonControllerService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        // this._commonControllerService.getSidebarObserver().subscribe((status: boolean) => {
        //     this._commonControllerService.isSidebarOpen = status === true;
        //     this._changeDetectorRef.detectChanges();
        // });
    }

    toggleSidebar() {
        this._commonControllerService.toggleSidebar();
    }

}
