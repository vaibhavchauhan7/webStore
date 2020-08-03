import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Product} from '../shared/entity/product.model';
import {ProductManagementService} from '../product/services/product-management.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    productList: Product[] = [];
    searchInput = '';

    constructor(private productManagementService: ProductManagementService,
                private route: ActivatedRoute) {
        this.productList = this.route.snapshot.data.productList;
    }

    ngOnInit(): void {
    }

    trackBy(index, item): void {
        return item.id;
    }
}
