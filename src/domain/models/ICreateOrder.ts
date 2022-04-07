import { Customer } from '@domain/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface ICreateOrder {
  customer: Customer;
  products: IProduct[];
}
