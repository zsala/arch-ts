import Cart from "../cart";
import Product from "../product";
import Voucher from "../voucher";

export default class VoucherCalculatorService {
  applyDiscountToProduct(product: Product, voucher: Voucher): Product {
    product.price = product!.price - (product!.price * voucher!.discount) / 100;
    return product;
  }

  applyDiscountToCart(cart: Cart, voucher: Voucher): Cart {
    cart.totalWithDiscount = 0;

    for (let i = 0; i < cart.products.length; i++) {
      cart.totalWithDiscount += cart.products[i].price;
    }
    cart.totalWithDiscount -= (cart!.totalWithDiscount * voucher!.discount) / 100;

    
    return cart;
  }
}
