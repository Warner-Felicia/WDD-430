import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '../store.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit, OnDestroy {
  stores: Store[];
  subscription: Subscription;
  term: string;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.stores = this.storeService.getStores();
    this.subscription = this.storeService.storeListChangeEvent.subscribe(
      (stores: Store[]) => {
        this.stores = stores;
      }
    );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

