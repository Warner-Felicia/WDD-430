import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  originalItem: Item;
  item: Item;
  editMode = false;
  id: string;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newItem = new Item(
      this.id,
      value.name
    );
    if (this.editMode) {
      this.itemService.updateItem(this.originalItem, newItem);
    } else {
      this.itemService.addItem(newItem);
    }
    form.reset();
  }

  onCancel(form: NgForm) {
    form.reset();
  }

}
