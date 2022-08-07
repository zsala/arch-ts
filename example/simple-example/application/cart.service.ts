import { Inject, Service } from "typedi";
import {
  VoucherRepository,
  ProductRepository,
  CartRepository,
} from "../infrastructure/repositories";
import { folderPathProducts } from "../infrastructure/repositories/product.repository";
import { Cart, Product } from "../domain";
import VoucherCalculatorService from "../domain/services/voucher.calculator.service";

@Service()
export default class CartService {
  voucherCalculatorService: VoucherCalculatorService;

  constructor(
    @Inject() private voucherRepository: VoucherRepository,
    @Inject() private productRepository: ProductRepository,
    @Inject() private cartRepository: CartRepository
  ) {
    this.voucherCalculatorService = new VoucherCalculatorService();
  }

  getById(): Cart | null {
    const cart = this.cartRepository.getById();
    const voucher = this.voucherRepository.getById("10");

    if (!cart) {
      return null;
    }

    // get all products
    const products = cart.productIds.map((productId: string) => {
      const path = folderPathProducts + productId + ".json";
      return this.productRepository.getById(path);
    });

    cart.products = products as Product[];
    cart.calculate();

    return this.voucherCalculatorService.applyDiscountToCart(cart, voucher!);
  }
}
