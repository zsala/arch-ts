import { ICartData } from "../interfaces";

export default class CartModel {
  id: string;
  products: string[];
  
  constructor(cartData: ICartData) {
    this.id = cartData.id;
    this.products = [];
  }
}
