import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProduct } from '../usecases/DeleteProduct';

export class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeProduct = container.resolve(DeleteProduct);

    await removeProduct.execute({ id });

    return response.json([]);
  }
}
