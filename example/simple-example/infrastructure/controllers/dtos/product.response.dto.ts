import { IProductData } from "../../../domain/interfaces";

export default class ProductResponseDTO {
  id: string = '';
  name: string = '';
  price: number = 0;

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
    this.title1 = productData.title1;
    this.title2 = productData.title2;
    this.title3 = productData.title3;
    this.title4 = productData.title4;
    this.description1 = productData.description1;
    this.description2 = productData.description2;
    this.description3 = productData.description3;
    this.description4 = productData.description1;
    this.price = productData.price;
  }

  setId(id: string): this {
    this.id = id;
    return this;
  }

  setName(name: string): this {
    this.name = name;
    return this;
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
