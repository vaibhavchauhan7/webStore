import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

    transform(productList: any[], searchInput: string): any[] {
        if (!productList || !searchInput) {
            return productList;
        }

        return productList.filter(product => {
            return product.name.toLocaleLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
        });
    }

}
