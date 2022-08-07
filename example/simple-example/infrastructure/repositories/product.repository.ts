import fs from "fs";
import { Product } from "../../domain";
import { ProductDbMapper } from "./mappers";
import ProductModel from "./models/product-model";
import { Service } from "typedi";

export const folderPathProducts = "./local-data/products/";

@Service()
export default class ProductRepository {
  productDbMapper: ProductDbMapper;

  constructor() {
    this.productDbMapper = new ProductDbMapper();
  }

  getById(id: string): Product | null {
    let data;
    try {
      data = fs.readFileSync(id, "utf8");
      const product: ProductModel = JSON.parse(data);
      return this.productDbMapper.toDomain(product);
    } catch (err) {
      return null;
    }
  }

  getAll(): Product[] {
    const products: Product[] = [];
    const files = fs.readdirSync(folderPathProducts);
    for (let id of files) {
      const path = folderPathProducts + id;
      const product = this.getById(path);
      if (product) {
        products.push(product);
      }
    }
    return products;
  }

  upsert(data: Product): void {
    let product = this.getById(data.id);
    product = product ? this.#update(data, product) : this.#create(data);

    // save data
    this.#save(product);
  }

  #update(data: Product, product: Product): Product {
    const {
      name,
      title1,
      title2,
      title3,
      title4,
      description1,
      description2,
      description3,
      description4,
      price,
    } = data;

    return product
      .setName(name)
      .setTitle1(title1!)
      .setTitle2(title2!)
      .setTitle3(title3!)
      .setTitle3(title4!)
      .setDescription1(description1!)
      .setDescription2(description2!)
      .setDescription3(description3!)
      .setDescription4(description4!)
      .setPrice(price);
  }

  #create(data: Product): Product {
    return new Product(data);
  }

  #save(product: Product): void {
    const path = folderPathProducts + product.id.toLowerCase() + ".json";
    fs.writeFileSync(path, JSON.stringify(product));
  }
}
