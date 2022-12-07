import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Item } from './item.model';
import { ItemService } from "./item.service";

@Injectable({ providedIn: 'root' })
export class ItemsResolverService implements Resolve<Item[]> {
  constructor(private itemService: ItemService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.itemService.getItems();
  }
}