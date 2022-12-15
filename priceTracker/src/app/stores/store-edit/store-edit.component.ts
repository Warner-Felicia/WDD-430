import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '../store.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent implements OnInit {
  originalStore: Store;
  store: Store;
  editMode = false;
  id: string;

  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newStore = new Store(
      this.id,
      value.name,
      value.location,
    );
    this.storeService.addStore(newStore);
    form.reset();
  }

  onCancel() {
    this.router.navigate(['stores']);
  }

}
