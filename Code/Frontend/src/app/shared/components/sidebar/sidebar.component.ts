import {Component, OnInit} from '@angular/core';

import {AuthenticationService} from "../../../authentication/services/authentication.service";
import {CommonControllerService} from "../../services/common-controller.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    constructor(public _commonControllerService: CommonControllerService,
                public _authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    logout(): boolean {
        sessionStorage.removeItem('customerName');
        localStorage.clear();
        return this._authenticationService.isCustomerAuthenticated = false;
    }

}
