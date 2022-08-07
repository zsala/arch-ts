import { IProductData } from "./interfaces";
// import { v4 as uuid } from "uuid";

export default class Product {
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


  constructor(props: IProductData) {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Product name must not be empty');
    }

    if (props.price < 0) {
      throw new Error('Product price must be non-negative');
    }

    this.id = props.id;
    this.name = props.name;
    this.title1 = props.title1;
    this.title2 = props.title2;
    this.title3 = props.title3;
    this.title4 = props.title4;
    this.description1 = props.description1;
    this.description2 = props.description2;
    this.description3 = props.description3;
    this.description4 = props.description4;
    this.price = props.price;
  }

  setId(id: string): this {
    this.id = id;
    return this;
  }

  setName(name: string): this {
    if (!name || name.trim().length === 0) {
      throw new Error('Product name must not be empty');
    }

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
    if (price < 0) {
      throw new Error('Product price must be non-negative');
    }

    this.price = price;
    return this;
  }
}
