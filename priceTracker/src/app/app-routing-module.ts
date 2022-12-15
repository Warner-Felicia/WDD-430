import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemsResolverService } from './items/items-resolver.service';
import { ItemsComponent } from './items/items.component';
import { ListItemsResolverService } from './lists/list-item-resolver.service';
import { ListsComponent } from './lists/lists.component';
import { PriceEditComponent } from './prices/price-edit/price-edit.component';
import { PricesResolverService } from './prices/prices-resolver.service';
import { PricesComponent } from './prices/prices.component';
import { StoreEditComponent } from './stores/store-edit/store-edit.component';
import { StoresResolverService } from './stores/stores-resolver.service';
import { StoresComponent } from './stores/stores.component';

const appRoutes: Routes = [
  { path: '', component: ListsComponent, resolve: [ListItemsResolverService] },
  {
    path: 'prices', component: PricesComponent, resolve: [ListItemsResolverService], children: [
      { path: 'new', component: PriceEditComponent },
      { path: 'edit/:id', component: PriceEditComponent }
    ]
  },
  { path: 'items', component: ItemsComponent, resolve: [ItemsResolverService], children: [
    { path: 'new', component: ItemEditComponent }
  ] },
  { path: 'stores', component: StoresComponent, resolve: [StoresResolverService], children: [
    { path: 'new', component: StoreEditComponent }
  ] },
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