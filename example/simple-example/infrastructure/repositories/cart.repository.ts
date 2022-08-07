import CartModel from "./models/cart-model";
import { CartDbMapper } from "./mappers";
import Cart from "../../domain/cart";
import fs from "fs";
import { Service } from "typedi";

export const folderPathCart = "./local-data/carts/";
@Service()
export default class CartRepository {
  getById(): Cart | null {
    let data;
    try {
      const path = folderPathCart + "cart.json";
      data = fs.readFileSync(path, "utf8");
      const cartObj = JSON.parse(data);
      const cartModel: CartModel = new CartModel({ id: "1" });
      cartModel.products = cartObj.product_ids;

      const cartDbMapper = new CartDbMapper();
      return cartDbMapper.toDomain(cartModel);
    } catch (err) {
      return null;
    }
  }
}
