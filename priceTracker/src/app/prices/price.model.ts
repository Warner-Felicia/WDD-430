import { Item } from "../items/item.model";
import { Store } from "../stores/store.model";

export class Price {
  constructor(
    public id: string,
    public item: Item,
    public size: number,
    public unit: string,
    public value: number,
    public unitPrice: number,
    public store: Store,
    public aisle: string,
    public brand?: string    
  ) {

  }
}