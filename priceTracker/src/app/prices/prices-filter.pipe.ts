import { Pipe, PipeTransform } from '@angular/core';

import { Price } from './price.model';

@Pipe({
  name: 'pricesFilter'
})
export class PricesFilterPipe implements PipeTransform {

  transform(prices: Price[], term: string, resultType: string): any {
    let filteredPrices: Price[] = [];

    if (term && term.length > 0) {
      filteredPrices = prices.filter(
        (price: Price) => price.item.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (filteredPrices.length < 1 && resultType === 'priceList') {
      return prices;
    }
    return filteredPrices;
  }

}