import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrder, ShowOrder } from '../usecases';

export class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrder);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.status(201).json(order);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrder);

    const order = await showOrder.execute({ id });

    return response.status(200).json(order);
  }
}
