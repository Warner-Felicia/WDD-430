import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/items/item.model';
import { ItemService } from 'src/app/items/item.service';
import { Store } from 'src/app/stores/store.model';
import { StoreService } from 'src/app/stores/store.service';
import { Price } from '../price.model';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.css']
})
export class PriceEditComponent implements OnInit, OnDestroy {
  originalPrice: Price;
  price: Price;
  id: string;
  @Input() editMode = false;
  items: Item[];
  itemSubscription: Subscription;
  stores: Store[];
  storeSubscription: Subscription;

  constructor(private priceService: PriceService, private itemService: ItemService, private storeService: StoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //getting items to populate dropdown
    this.items = this.itemService.getItems();
    this.itemSubscription = this.itemService.itemListChangeEvent.subscribe((items: Item[]) => {
      this.items = items;
    });
    //getting stores to populate dropdown
    this.stores = this.storeService.getStores();
    this.storeSubscription = this.storeService.storeListChangeEvent.subscribe((stores: Store[]) => {
      this.stores = stores;
    })
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      if (!this.id) {
        this.editMode = false;
        return
      }
      this.originalPrice = this.priceService.getPrice(this.id);
      if (!this.originalPrice) {
        return;
      }
      this.editMode = true;
      this.price = JSON.parse(JSON.stringify(this.originalPrice));

    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const unitPrice = Math.round(value.value / value.size * 100) / 100;
    const newPrice = new Price(
      this.id,
      value.item,
      value.size,
      value.unit,
      value.value,
      unitPrice,
      value.store,
      value.aisle,
      value.brand,
    );

    if (this.editMode) {
      this.priceService.updatePrice(this.originalPrice, newPrice);
    } else {
      this.priceService.addPrice(newPrice);
    }
    this.router.navigate(['prices']);
  }

  onCancel() {
    this.router.navigate(['prices']);
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
