import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProduct } from '../usecases/UpdateProduct';

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = container.resolve(UpdateProduct);

    const products = await updateProduct.execute({ id, name, price, quantity });

    return response.status(201).json(products);
  }
}
