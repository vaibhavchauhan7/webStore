import {Component} from '@angular/core';

import {CommonControllerService} from "./shared/services/common-controller.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title: string = 'webStore';

    constructor(public _commonControllerService: CommonControllerService) {
    }

}
