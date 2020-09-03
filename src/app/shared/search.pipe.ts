import {Pipe, PipeTransform} from "@angular/core";
import {ProductItem} from "./interfaces";

@Pipe({
    name: 'searchProducts'
})

export class SearchPipe implements PipeTransform{
    transform(products: ProductItem[], search = ''): ProductItem[] {
        if (!search.trim()) {
            return products;
        }

        return products.filter(product => {
            return product.title.toLowerCase().includes(search.toLowerCase());
        })
    }

}
