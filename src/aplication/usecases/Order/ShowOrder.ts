import { Order } from '@domain/entities/Order';
import { AppError } from '@infra/errors/AppError';
import { IOrderRepository } from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
export class ShowOrder {
  constructor(
    @inject('')
    private orderRepository: IOrderRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}
