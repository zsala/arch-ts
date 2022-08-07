import CartProductResponseDTO from "./cart-product.response.dto";

export default class CartResponseDTO {
  id: string;
  name: string;

  products: CartProductResponseDTO[];

  totalWithDiscount: number;
  total: number;

  constructor() {
    this.id = "";
    this.name = "";

    this.products = [];
    this.totalWithDiscount = 0;
    this.total = 0;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setProducts(products: CartProductResponseDTO[]): this {
    this.products = products;
    return this;
  }

  setTotalWithDiscount(totalWithDiscount: number): this {
    this.totalWithDiscount = totalWithDiscount;
    return this;
  }

  setTotal(total: number): this {
    this.total = total;
    return this;
  }
}
