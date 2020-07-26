import {Component, OnInit} from '@angular/core';

import {CommonControllerService} from "../../services/common-controller.service";
import {AuthenticationService} from "../../../authentication/services/authentication.service";

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

}
