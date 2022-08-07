import Cart from "../../../domain/cart";
import { CartProductResponseDTO, CartResponseDTO } from "../dtos";
import CartProductDTOMapper from "./cart-product.mapper.dto";

export default class CartDTOMapper {
  cartProductDTOMapper: CartProductDTOMapper;

  constructor() {
    this.cartProductDTOMapper = new CartProductDTOMapper();
  }

  toDomain(cart: Cart): CartResponseDTO {
    const cartProductDTO: CartProductResponseDTO[] =
      this.cartProductDTOMapper.toDomains(cart.products);
    const cartDTO = new CartResponseDTO();
    cartDTO.id = cart.id;
    cartDTO.setTotal(cart.total);
    cartDTO.setTotalWithDiscount(cart.totalWithDiscount);
    cartDTO.setProducts(cartProductDTO);

    return cartDTO;
  }
}
