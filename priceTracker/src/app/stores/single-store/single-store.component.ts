import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '../store.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-single-store',
  templateUrl: './single-store.component.html',
  styleUrls: ['./single-store.component.css']
})
export class SingleStoreComponent implements OnInit {
  @Input() store: Store;
  editMode = false;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }

  onEdit() {
    this.editMode = true;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const updatedStore = new Store(
      this.store.id,
      value.name,
      value.location,
    );
    this.storeService.updateStore(this.store, updatedStore);
  }

  onCancel() {
    this.editMode = false;
  }

  onDelete() {
    this.storeService.deleteStore(this.store);
  }

}
