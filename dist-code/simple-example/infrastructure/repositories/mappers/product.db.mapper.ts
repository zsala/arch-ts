import { Product } from "../../../domain";
import { IProductData } from "../interfaces";
import { ProductModel } from "../models";

export default class ProductDbMapper {
  toDomain(dbProduct: ProductModel): Product {
    return new Product({ ...dbProduct});
  }

  toDomains(dbProducts: ProductModel[]): Product[] {
    return dbProducts.map((dbProduct) => this.toDomain(dbProduct));
  }
}
