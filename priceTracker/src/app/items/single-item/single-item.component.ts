import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {
@Input () item: Item;
editMode = false;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  onEdit() {
    this.editMode = true;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const updatedItem = new Item(
      this.item.id,
      value.name,
    );
    this.itemService.updateItem(this.item, updatedItem);
  }

  onCancel() {
    this.editMode = false;
  }

  onDelete() {
    this.itemService.deleteItem(this.item);
  }

}
