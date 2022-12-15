import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListItem } from '../listItem.model';
import { ListItemsService } from '../listItems-service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
@Input() listItem: ListItem;
editMode = false;


  constructor(private listItemsService: ListItemsService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const newListItem = {...this.listItem};
    newListItem.quantity = form.value.quantity;
    this.listItemsService.updateListItem(this.listItem, newListItem);
  }

  onEdit() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
  }

  onDelete() {
    this.listItemsService.deleteListItem(this.listItem);
  }

}
