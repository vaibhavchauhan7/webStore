import {Component, OnInit} from '@angular/core';
import {CommonControllerService} from "../../services/common-controller.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    constructor(public _commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
    }

    hideMenu() {
        this._commonControllerService.toggleSidebar();
    }

}
