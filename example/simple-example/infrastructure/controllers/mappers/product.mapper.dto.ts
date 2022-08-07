import Product from "../../../domain/product";
import { CartProductResponseDTO, ProductResponseDTO } from "../dtos";
import CreateProductDTO from "../dtos/create.product.dto";
import { Request } from "express";

export default class ProductDTOMapper {
  toDomain(product: Product): ProductResponseDTO {
    const productDTO: ProductResponseDTO = new ProductResponseDTO(product);

    return productDTO.setId(product.id);
  }

  toDomains(products: Product[]): CartProductResponseDTO[] {
    return products.map((product) => this.toDomain(product));
  }

  toCreateProductDTO(req: Request): CreateProductDTO {
    const {
      id,
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
    } = req.body;

    return {
      id,
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
    } as CreateProductDTO;
  }
}
