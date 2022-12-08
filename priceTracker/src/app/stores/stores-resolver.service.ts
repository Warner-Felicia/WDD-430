import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from './store.model';
import { StoreService } from "./store.service";

@Injectable({ providedIn: 'root' })
export class StoresResolverService implements Resolve<Store[]> {
  constructor(private storeService: StoreService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.storeService.getStores();
  }
}