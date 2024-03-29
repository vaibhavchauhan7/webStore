import {Pipe, PipeTransform} from '@angular/core';

import {Product} from '../entity/models';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

    transform(productList: Product[], searchInput: string): Product[] {
        if (!productList || !searchInput) {
            return productList;
        }

        return productList.filter((product: Product) => {
            return product.name.toLocaleLowerCase().indexOf(searchInput.toLowerCase()) !== -1
                || product.description.toLocaleLowerCase().indexOf(searchInput.toLowerCase()) !== -1
                || product.category.toLocaleLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
        });
    }

}
