import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProduct } from '../usecases/CreateProduct';
import { DeleteProduct } from '../usecases/DeleteProduct';
import { ListProducts } from '../usecases/ListProducts';
import { ShowProduct } from '../usecases/ShowProduct';
import { UpdateProduct } from '../usecases/UpdateProduct';

export class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProduct);

    await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.status(201).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const showProduct = container.resolve(ShowProduct);

    const product = await showProduct.execute({ name: name as string });

    return response.json(product);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listProduct = container.resolve(ListProducts);

    const products = await listProduct.execute();

    return response.json(products);
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

    return response.json([]);
  }
}