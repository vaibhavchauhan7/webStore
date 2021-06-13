import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Product} from '../shared/entity/models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    searchInput = '';
    productList: Product[] = [];

    constructor(private route: ActivatedRoute) {
        this.productList = this.route.snapshot.data.productList;
    }

    ngOnInit(): void {
    }

}
