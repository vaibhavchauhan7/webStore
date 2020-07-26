import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Product} from "../shared/entity/product.model";
import {ProductManagementService} from "../product/services/product-management.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    productList: Product[] = [];
    searchInput: string = '';

    constructor(private _productManagementService: ProductManagementService,
                private _route: ActivatedRoute) {
        this.productList = this._route.snapshot.data['productList'];
    }

    ngOnInit(): void {
    }

}
