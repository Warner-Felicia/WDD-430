import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Price } from '../price.model';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-single-price',
  templateUrl: './single-price.component.html',
  styleUrls: ['./single-price.component.css']
})
export class SinglePriceComponent implements OnInit {
  @Input() price: Price;
  editMode = false;
  id: string;

  constructor(private priceService: PriceService, private router: Router) { }

  ngOnInit(): void {
  
  }

  onEdit() {
    this.router.navigate(['prices','edit', this.price.id]);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const updatedPrice = new Price(
      this.id,
      value.item,
      value.size,
      value.unit,
      value.value,
      value.store,
      value.aisle,
      value.brand,
    );
    this.priceService.updatePrice(this.price, updatedPrice);
  }

  onCancel() {
    this.editMode = false;
  }

  onDelete() {
    this.priceService.deletePrice(this.price);
  }

}
