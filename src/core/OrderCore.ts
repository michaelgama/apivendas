import { Order } from '@domain/entities/Order';
import { ICreateOrder } from '@domain/models/ICreateOrder';
import { IOrderRepository } from 'aplication/repositories/IOrderRepository';
import { getRepository, Repository } from 'typeorm';

export class OrderCore implements IOrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.repository.create({
      customer,
      order_products: products,
    });

    await this.repository.save(order);

    return order;
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repository.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }
}
