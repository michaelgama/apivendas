import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateProduct,
  DeleteProduct,
  ListProducts,
  ShowProduct,
  UpdateProduct,
} from '../usecases';

export class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProduct);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.status(201).json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const showProduct = container.resolve(ShowProduct);

    const product = await showProduct.execute({ name: name as string });

    return response.status(200).json(product);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listProduct = container.resolve(ListProducts);

    const products = await listProduct.execute();

    return response.status(200).json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = container.resolve(UpdateProduct);

    const products = await updateProduct.execute({ id, name, price, quantity });

    return response.status(201).json(products);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeProduct = container.resolve(DeleteProduct);

    await removeProduct.execute({ id });

    return response.status(204).json([]);
  }
}
