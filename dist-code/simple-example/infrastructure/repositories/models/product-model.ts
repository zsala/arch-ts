import { IProductData } from "../interfaces";

export default class ProductModel {
  id: string;
  name: string;
  price: number;

  title1: string | null;
  title2: string | null;
  title3: string | null;
  title4: string | null;

  description1: string | null;
  description2: string | null;
  description3: string | null;
  description4: string | null;

  constructor(productData: IProductData) {
    this.id = productData.id;
    this.name = productData.name;
    this.title1 = null;
    this.title2 = null;
    this.title3 = null;
    this.title4 = null;
    this.description1 = null;
    this.description2 = null;
    this.description3 = null;
    this.description4 = null;
    this.price = 0;
  }

  setTitle1(title1: string): this {
    this.title1 = title1;
    return this;
  }

  setTitle2(title2: string): this {
    this.title2 = title2;
    return this;
  }

  setTitle3(title3: string): this {
    this.title3 = title3;
    return this;
  }

  setTitle4(title4: string): this {
    this.title4 = title4;
    return this;
  }

  setDescription1(description1: string): this {
    this.description1 = description1;
    return this;
  }

  setDescription2(description2: string): this {
    this.description2 = description2;
    return this;
  }

  setDescription3(description3: string): this {
    this.description3 = description3;
    return this;
  }

  setDescription4(description4: string): this {
    this.description4 = description4;
    return this;
  }

  setPrice(price: number): this {
    this.price = price;
    return this;
  }
}
