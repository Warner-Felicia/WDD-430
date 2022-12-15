import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Price } from '../prices/price.model';
import { PriceService } from '../prices/price.service';
import { ListItem } from './listItem.model';
import { ListItemsService } from './listItems-service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy {
  listItems: ListItem[];
  subscripition: Subscription;

  constructor(private listItemsService: ListItemsService) {
    this.listItems = this.listItemsService.getListItems();
    this.subscripition = this.listItemsService.listItemsChangeEvent.subscribe((listItems: ListItem[]) => {
      this.listItems = listItems;
    });
  }

  ngOnInit(): void {
  }

  onDeleteAllListItems() {
    this.listItemsService.deleteAllItems();
  }

  ngOnDestroy(): void {
    this.subscripition.unsubscribe();
  }

}
