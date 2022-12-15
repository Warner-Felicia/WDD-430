import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ListItem } from './listItem.model';

@Injectable({
  providedIn: 'root'
})
export class ListItemsService {
  listItems: ListItem[] = [];
  listItemsChangeEvent = new Subject<ListItem[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, listItems: ListItem[] }>(
      'http://localhost:3000/listItems'
    ).subscribe((responseData: { message: String, listItems: ListItem[] }) => {
      this.listItems = responseData.listItems;
      this.listItemsChangeEvent.next(this.listItems.slice());
    })
  }

  getListItem(id: string): ListItem {
    this.getListItems();
    for (const listItem of this.listItems) {
      if (listItem.id.toString() === id) {
        return listItem;
      }
    }
    return null;

  }

  getListItems(): ListItem[] {
    return this.listItems.slice();
  }

  addListItem(newListItem: ListItem) {
    if (!newListItem) {
      return;
    }
    newListItem.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //add to database
    this.http.post<{ message: String, listItem: ListItem }>(
      'http://localhost:3000/listItems',
      newListItem,
      { headers }
    ).subscribe(responseData => {
      this.listItems.push(responseData.listItem);
      this.listItemsChangeEvent.next(this.listItems.slice());
    });
  }
  updateListItem(originalListItem: ListItem, newListItem: ListItem) {
    if (!originalListItem || !newListItem) {
      return;
    }
    const position = this.listItems.findIndex(c => c.id === originalListItem.id);
    if (position < 0) {
      return;
    }

    //set id of new list to original list
    newListItem.id = originalListItem.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put(
      'http://localhost:3000/listItems/' + originalListItem.id,
      newListItem,
      { headers }
    ).subscribe((response: Response) => {
        this.listItems[position] = newListItem;
        this.listItemsChangeEvent.next(this.listItems.slice());
    });
  }

  deleteListItem(listItem: ListItem) {
    if (!listItem) {
      return;
    }

    const position = this.listItems.findIndex(i => i.id === listItem.id);
    if (position < 0) {
      return;
    }

    //delete from database
    this.http.delete(
      'http://localhost:3000/listItems/' + listItem.id,
    ).subscribe((response: Response) => {
      this.listItems.splice(position, 1);
      this.listItemsChangeEvent.next(this.listItems.slice());
    });
  }

  deleteAllItems() {
    this.http.delete(
      'http://localhost:3000/listItems/',
    ).subscribe((response: Response) => {
      this.listItems = [];
      this.listItemsChangeEvent.next(this.listItems.slice());
    });
  }

}
