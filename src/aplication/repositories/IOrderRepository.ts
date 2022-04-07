import { Order } from '@domain/entities/Order';
import { ICreateOrder } from 'domain/models/ICreateOrder';

export interface IOrderRepository {
  create(data: ICreateOrder): Promise<Order>;
  findById(id: string): Promise<Order>;
}
