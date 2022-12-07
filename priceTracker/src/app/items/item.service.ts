import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [];
  itemListChangeEvent = new Subject<Item[]>();

  constructor(private http: HttpClient) { 
    this.http.get<{ message: string, items: Item[] }>(
      'http://localhost:3000/items'
    ).subscribe((responseData: { message: String, items: Item[]}) => {
      this.items = responseData.items;
      this.sortAndSend();
    }, (error: any) => {
      console.log(error);
    });
  }

  getItems(): Item[] {
    return this.items.slice();
  }

  addItem(newItem: Item) {
    if (!newItem) {
      return;
    }
    newItem.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //add to database
    this.http.post<{ message: String, item: Item }>(
      'http://localhost:3000/items',
      newItem,
      { headers }
    ).subscribe(responseData => {
      this.items.push(responseData.item);
      this.sortAndSend();
    });
  }
  updateItem(originalItem: Item, newItem: Item) {
    if (!originalItem || !newItem) {
      return;
    }
    const position = this.items.findIndex(c => c.id === originalItem.id);
    if (position < 0) {
      return;
    }

    //set id of new item to original item
    newItem.id = originalItem.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put(
      'http://localhost:3000/items/' + originalItem.id,
      newItem,
      { headers }
    ).subscribe((response: Response) => {
      this.items[position] = newItem;
      this.sortAndSend();
    });
  }

  deleteItem(item: Item) {
    if (!item) {
      return;
    }

    const position = this.items.findIndex(i => i.id === item.id);
    if (position < 0) {
      return;
    }

    //delete from database
    this.http.delete(
      'http://localhost:3000/items/' + item.id,
    ).subscribe((response: Response) => {
      this.items.splice(position, 1);
      this.itemListChangeEvent.next(this.items.slice());
    });
  }

  sortAndSend() {
    const sortedItems = this.items.sort((a, b) => a.name > b.name ? 1 : -1);
    this.items = sortedItems;
    this.itemListChangeEvent.next(this.items.slice());
  }
}
