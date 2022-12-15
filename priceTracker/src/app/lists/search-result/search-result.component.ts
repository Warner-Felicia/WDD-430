import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Price } from 'src/app/prices/price.model';
import { ListItem } from '../listItem.model';
import { ListItemsService } from '../listItems-service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
@Input() price: Price;
id: string;

  constructor(private listItemsService: ListItemsService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const listItem = new ListItem(
      this.id,
      this.price,
      form.value.quantity
        );
    this.listItemsService.addListItem(listItem);
    
  }

}
