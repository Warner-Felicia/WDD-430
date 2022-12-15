import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";

import { ListItem } from './listItem.model';
import { ListItemsService } from "./listItems-service";

@Injectable({ providedIn: 'root' })
export class ListItemsResolverService implements Resolve<ListItem[]> {
  constructor(private listItemsService: ListItemsService, private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListItem[] {
    return this.listItemsService.getListItems();
  }
}