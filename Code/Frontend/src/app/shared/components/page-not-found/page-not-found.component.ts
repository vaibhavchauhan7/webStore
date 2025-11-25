import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    imports: [
        RouterLink
    ],
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
