import { Customer } from '@domain/entities/Customer';
import { ICreateCustomer } from 'domain/models/ICreateCustomer';

export interface ICustomerRepository {
  create(data: ICreateCustomer): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  findByPhone(phone: string): Promise<Customer>;
}