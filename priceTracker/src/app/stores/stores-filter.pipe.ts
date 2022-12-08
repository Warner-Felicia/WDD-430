import { Pipe, PipeTransform } from '@angular/core';

import { Store } from './store.model';

@Pipe({
  name: 'storesFilter'
})
export class StoresFilterPipe implements PipeTransform {

  transform(stores: Store[], term: string): any {
    let filteredStores: Store[] = [];

    if (term && term.length > 0) {
      filteredStores = stores.filter(
        (store: Store) => store.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (filteredStores.length < 1) {
      return stores;
    }
    return filteredStores;
  }

}