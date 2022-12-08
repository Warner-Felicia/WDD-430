import { Pipe, PipeTransform } from '@angular/core';

import { Item } from './item.model';

@Pipe({
  name: 'itemsFilter'
})
export class ItemsFilterPipe implements PipeTransform {

  transform(items: Item[], term: string): any {
    let filteredItems: Item[] = [];

    if (term && term.length > 0) {
      filteredItems = items.filter(
        (item: Item) => item.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (filteredItems.length < 1) {
      return items;
    }
    return filteredItems;
  }

}