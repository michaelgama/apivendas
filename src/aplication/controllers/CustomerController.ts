import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomer, ListCustomer, ShowCustomer } from '../usecases';

export class CustommerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body;

    const createCustomer = container.resolve(CreateCustomer);

    const customer = await createCustomer.execute({
      name,
      email,
      phone,
    });

    return response.status(201).json(customer);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const showCustomer = container.resolve(ShowCustomer);

    const customer = await showCustomer.execute({ name: name as string });

    return response.status(200).json(customer);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCustomer = container.resolve(ListCustomer);

    const products = await listCustomer.execute();

    return response.status(200).json(products);
  }
}
