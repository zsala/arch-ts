import Product from "../../../domain/product";
import { CartProductResponseDTO } from "../dtos";

export default class CartProductDTOMapper {
  toDomain(product: Product): CartProductResponseDTO {
    return new CartProductResponseDTO(product);
  }

  toDomains(products: Product[]): CartProductResponseDTO[] {
    return products.map((product) => this.toDomain(product));
  }
}
