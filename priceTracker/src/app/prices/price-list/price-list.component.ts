import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Price } from '../price.model';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit, OnDestroy {
  prices: Price[];
  subscription: Subscription;
  term: string;

  constructor(private priceService: PriceService) { }

  ngOnInit(): void {
    this.prices = this.priceService.getPrices();
    this.subscription = this.priceService.priceListChangeEvent.subscribe(
      (prices: Price[]) => {
        this.prices = prices;
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
