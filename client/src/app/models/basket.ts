import type { Product } from "./product";

export type Basket = {
  basketId: string;
  items: Item[];
  clientSecret?: string;
  paymentIntentId?: string;
};

export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.type = product.type;
    this.brand = product.brand;
    this.quantity = quantity;
  }
  productId: number;
  name: string;
  price: number;
  pictureUrl?: string;
  type: string;
  brand: string;
  quantity: number;
}
