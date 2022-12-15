import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Price } from 'src/app/prices/price.model';
import { PriceService } from 'src/app/prices/price.service';

@Component({
  selector: 'app-add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrls: ['./add-list-item.component.css']
})
export class AddListItemComponent implements OnInit, OnDestroy {
  prices: Price[];
  subscription: Subscription
  term: string;

  constructor(private priceService: PriceService) {
    this.prices = this.priceService.getPrices();
    this.subscription = this.priceService.priceListChangeEvent.subscribe(
      (prices: Price[]) => {
        this.prices = prices;
      }
    );
  }

  ngOnInit(): void {
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
