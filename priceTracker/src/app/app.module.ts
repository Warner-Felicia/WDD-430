import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { PricesComponent } from './prices/prices.component';
import { ListsComponent } from './lists/lists.component';
import { ItemsComponent } from './items/items.component';
import { StoresComponent } from './stores/stores.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { PriceListComponent } from './prices/price-list/price-list.component';
import { PriceEditComponent } from './prices/price-edit/price-edit.component';
import { StoreListComponent } from './stores/store-list/store-list.component';
import { StoreEditComponent } from './stores/store-edit/store-edit.component';
import { AppRoutingModule } from './app-routing-module';
import { AddListItemComponent } from './lists/add-list-item/add-list-item.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { SingleItemComponent } from './items/single-item/single-item.component';
import { ItemsFilterPipe } from './items/items-filter.pipe';
import { SingleStoreComponent } from './stores/single-store/single-store.component';
import { StoresFilterPipe } from './stores/stores-filter.pipe';
import { SinglePriceComponent } from './prices/single-price/single-price.component';
import { PricesFilterPipe } from './prices/prices-filter.pipe';
import { SearchResultComponent } from './lists/search-result/search-result.component';
import { ListItemComponent } from './lists/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PricesComponent,
    ListsComponent,
    ItemsComponent,
    StoresComponent,
    PriceEditComponent,
    ItemEditComponent,
    PriceListComponent,
    StoreListComponent,
    StoreEditComponent,
    AddListItemComponent,
    ItemListComponent,
    SingleItemComponent,
    ItemsFilterPipe,
    SingleStoreComponent,
    StoresFilterPipe,
    SinglePriceComponent,
    PricesFilterPipe,
    SearchResultComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
