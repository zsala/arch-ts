import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { CartService } from "../../application";
import CartDTOMapper from "./mappers/cart.dto.mapper";

@Service()
export default class CartController {
  cartDTOMapper: CartDTOMapper;

  constructor(@Inject() private cartService: CartService) {
    this.cartDTOMapper = new CartDTOMapper();
  }

  get(req: Request, res: Response): void {
    const cart = this.cartService.getById();
    if (cart) {
      // retrieve aggregate data

      const dto = this.cartDTOMapper.toDomain(cart);

      res.json(dto);
      return;
    }

    res.sendStatus(404);
  }
}
