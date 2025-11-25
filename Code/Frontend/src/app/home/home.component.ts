import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';

import {Product} from '../shared/entity/models';
import {SearchFilterPipe} from '../shared/services/search-filter.pipe';
import {SharedModule} from '../shared.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [
        SharedModule,
        RouterLink,
        SearchFilterPipe,
        RouterLinkActive,
        NgOptimizedImage
    ],
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    searchInput: string = '';
    productList: Product[] = [];

    constructor(private route: ActivatedRoute) {
        this.productList = this.route.snapshot.data.productList;
    }

    ngOnInit(): void {
    }

}
