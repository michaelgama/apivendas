import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProducts } from '../usecases/ListProducts';

export class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProduct = container.resolve(ListProducts);

    const products = await listProduct.execute();

    return response.json(products);
  }
}
