import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowProduct } from '../usecases/ShowProduct';

export class ShowProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const showProduct = container.resolve(ShowProduct);

    const product = await showProduct.execute({ name: name as string });

    return response.json(product);
  }
}
