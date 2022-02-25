import { CreateProduct } from 'aplication/usecases/CreateProduct';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

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
