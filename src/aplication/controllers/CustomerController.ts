import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCustomer } from '../usecases';

export class CustommerController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body;

    const createCustomer = container.resolve(CreateCustomer);

    const customer = await createCustomer.execute({
      name,
      email,
      phone,
    });

    return response.status(201).json(customer);
  }
}
