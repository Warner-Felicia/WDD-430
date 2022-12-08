import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemsResolverService } from './items/items-resolver.service';
import { ItemsComponent } from './items/items.component';
import { AddListItemComponent } from './lists/add-list-item/add-list-item.component';
import { ListsComponent } from './lists/lists.component';
import { PriceEditComponent } from './prices/price-edit/price-edit.component';
import { PricesComponent } from './prices/prices.component';
import { StoreEditComponent } from './stores/store-edit/store-edit.component';
import { StoresResolverService } from './stores/stores-resolver.service';
import { StoresComponent } from './stores/stores.component';

const appRoutes: Routes = [
  { path: '', component: AddListItemComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'items', component: ItemsComponent, resolve: [ItemsResolverService] },
  { path: 'stores', component: StoresComponent, resolve: [StoresResolverService] },
  { 
    path: 'lists', component: ListsComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}