import { ICartData } from "./interfaces";
import Product from "./product";
import Voucher from "./voucher";

export default class Cart {
  id: string;

  totalWithDiscount: number;
  total: number;

  products: Product[];
  productIds: string[];

  constructor(cartData: ICartData) {
    this.id = cartData.id;
    this.products = [];
    this.totalWithDiscount = 0;
    this.total = 0;
    this.productIds = [];
  }

  calculate(): void {
    this.total = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.total += this.products[i].price;
    }
  }
}
