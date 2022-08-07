import { IProductData } from "../../../domain/interfaces";

export default class CartProductResponseDTO {
  id: string = '';
  name: string = '';
  price: number = 0;

  constructor(productData: IProductData) {
    this.id = productData.id;
    this.name = productData.name;
    this.price = productData.price;
  }

  setPrice(price: number): this {
    this.price = price;
    return this;
  }
}
