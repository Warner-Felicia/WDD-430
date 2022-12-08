import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Store } from './store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  stores: Store[] = [];
  storeListChangeEvent = new Subject<Store[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, stores: Store[] }>(
      'http://localhost:3000/stores'
    ).subscribe((responseData: { message: String, stores: Store[] }) => {
      this.stores = responseData.stores;
      this.sortAndSend();
    }, (error: any) => {
      console.log(error);
    });
  }

  getStores(): Store[] {
    return this.stores.slice();
  }

  addStore(newStore: Store) {
    if (!newStore) {
      return;
    }
    newStore.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //add to database
    this.http.post<{ message: String, store: Store }>(
      'http://localhost:3000/stores',
      newStore,
      { headers }
    ).subscribe(responseData => {
      this.stores.push(responseData.store);
      this.sortAndSend();
    }), (error: any) => {
      console.log(error);
    };
  }
  updateStore(originalStore: Store, newStore: Store) {
    if (!originalStore || !newStore) {
      return;
    }
    const position = this.stores.findIndex(c => c.id === originalStore.id);
    if (position < 0) {
      return;
    }

    //set id of new store to original store
    newStore.id = originalStore.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put(
      'http://localhost:3000/stores/' + originalStore.id,
      newStore,
      { headers }
    ).subscribe((response: Response) => {
      this.stores[position] = newStore;
      this.sortAndSend();
    }), (error: any) => {
      console.log(error);
    };
  }

  deleteStore(store: Store) {
    if (!store) {
      return;
    }

    const position = this.stores.findIndex(i => i.id === store.id);
    if (position < 0) {
      return;
    }

    //delete from database
    this.http.delete(
      'http://localhost:3000/stores/' + store.id,
    ).subscribe((response: Response) => {
      this.stores.splice(position, 1);
      this.storeListChangeEvent.next(this.stores.slice());
    });
  }

  sortAndSend() {
    const sortedStores = this.stores.sort((a, b) => a.name > b.name ? 1 : -1);
    this.stores = sortedStores;
    this.storeListChangeEvent.next(this.stores.slice());
  }
}
