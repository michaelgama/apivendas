import { Order } from '@domain/entities/Order';
import { ICreateOrder } from '@domain/models/ICreateOrder';
import { IOrderRepository } from 'aplication/repositories/IOrderRepository';
import { v4 as uuidV4 } from 'uuid';

export class OrderRepositoryInMemory implements IOrderRepository {
  orders: Order[] = [];

  async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      id: uuidV4(),
      customer,
      products,
    });

    this.orders.push(order);

    return order;
  }

  async findById(id: string): Promise<Order> {
    return this.orders.find(order => order.id === id);
  }
}
