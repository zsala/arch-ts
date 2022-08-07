import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { ProductService } from "../../application";
import { Product } from "../../domain";
import ProductDTOMapper from "./mappers/product.mapper.dto";

@Service()
export default class ProductController {
  productDTOMapper: ProductDTOMapper;

  constructor(@Inject() private productService: ProductService) {
    this.productDTOMapper = new ProductDTOMapper();
  }

  get(req: Request, res: Response): void {
    // mapping
    const { id } = req.query;
    if (id) {
      return this.#getById(id as string, res);
    }

    return this.#getAll(res);
  }

  #getAll(res: Response): void {
    const products = this.productService.getAll();
    res.json(this.productDTOMapper.toDomains(products));
  }

  #getById(id: string, res: Response): void {
    const product = this.productService.getById(id);
    if (product) {
      res.json(this.productDTOMapper.toDomain(product));
      return;
    }
    res.sendStatus(404);
  }

  post(req: Request, res: Response): void {
    // mapping & validation
    const createProductDTO = this.productDTOMapper.toCreateProductDTO(req);

    // upsert product data
    this.productService.upsert(createProductDTO);

    // return correct status code
    res.sendStatus(200);
  }
}
