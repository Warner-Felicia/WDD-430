import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Price } from './price.model';
import { PriceService } from "./price.service";

@Injectable({ providedIn: 'root' })
export class PricesResolverService implements Resolve<Price[]> {
  constructor(private priceService: PriceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.priceService.getPrices();
  }
}