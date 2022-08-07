import Cart from "../../../domain/cart";
import { CartModel } from "../models";

export default class CartDbMapper {
  toDomain(dbCart: CartModel): Cart {
    const cart = new Cart({ id: dbCart.id });
    cart.productIds = dbCart.products;
    return cart;
  }
}
