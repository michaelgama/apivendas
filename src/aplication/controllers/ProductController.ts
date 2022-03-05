import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProduct } from '../usecases/CreateProduct';

export class ProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProduct);

    await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.status(201).send();
  }
}
