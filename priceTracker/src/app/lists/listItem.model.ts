import { Price } from '../prices/price.model';

export class ListItem {
  constructor(
    public id: string,
    public price: Price,
    public quantity: number
  ) {

  }
}