import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Price } from './price.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  prices: Price[] = [];
  priceListChangeEvent = new Subject<Price[]>();

  constructor(private http: HttpClient) {
    this.http.get<{ message: string, prices: Price[] }>(
      'http://localhost:3000/prices'
    ).subscribe((responseData: { message: String, prices: Price[] }) => {
      this.prices = responseData.prices;
      this.sortAndSend();
    })
  }

  getPrice(id: string): Price {
    this.getPrices();
    for (const price of this.prices) {
      if (price.id.toString() === id) {
        return price;
      }
    }
    return null;

  }
  
  getPrices(): Price[] {
    return this.prices.slice();
  }

  addPrice(newPrice: Price) {
    if (!newPrice) {
      return;
    }
    newPrice.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //add to database
    this.http.post<{ message: String, price: Price }>(
      'http://localhost:3000/prices',
      newPrice,
      { headers }
    ).subscribe(responseData => {
      this.prices.push(responseData.price);
      this.sortAndSend();
    });
  }
  updatePrice(originalPrice: Price, newPrice: Price) {
    if (!originalPrice || !newPrice) {
      return;
    }
    const position = this.prices.findIndex(c => c.id === originalPrice.id);
    if (position < 0) {
      return;
    }

    //set id of new price to original price
    newPrice.id = originalPrice.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //update database
    this.http.put(
      'http://localhost:3000/prices/' + originalPrice.id,
      newPrice,
      { headers }
    ).subscribe((response: Response) => {
      //http call to populate item and store info
      this.http.get<{ message: string, price: Price }>(
        'http://localhost:3000/prices/' + newPrice.id
      ).subscribe((responseData: { message: String, price: Price }) => {
        this.prices[position] = responseData.price;
        this.sortAndSend();
      }, (error: any) => {
        console.log(error);
      });
    });
  }

  deletePrice(price: Price) {
    if (!price) {
      return;
    }

    const position = this.prices.findIndex(i => i.id === price.id);
    if (position < 0) {
      return;
    }

    //delete from database
    this.http.delete(
      'http://localhost:3000/prices/' + price.id,
    ).subscribe((response: Response) => {
      this.prices.splice(position, 1);
      this.priceListChangeEvent.next(this.prices.slice());
    });
  }

  sortAndSend() {
    const sortedPrices = this.prices.sort((a, b) => a.item.name > b.item.name ? 1 : -1);
    this.prices = sortedPrices;
    this.priceListChangeEvent.next(this.prices.slice());
  }
}
