import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    imports: [
        RouterOutlet
    ],
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
