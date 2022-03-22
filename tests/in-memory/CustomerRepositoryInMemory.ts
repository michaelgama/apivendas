import { Customer } from '@domain/entities/Customer';
import { ICreateCustomer } from '@domain/models/ICreateCustomer';
import { ICustomerRepository } from 'aplication/repositories/ICustomerRepository';
import { v4 as uuidV4 } from 'uuid';

export class CustomerRepositoryInMemory implements ICustomerRepository {
  customers: Customer[] = [];

  async create({ name, email, phone }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      id: uuidV4(),
      name,
      email,
      phone,
    });

    this.customers.push(customer);

    return customer;
  }

  async findByEmail(email: string): Promise<Customer> {
    return this.customers.find(customer => customer.email === email);
  }

  async findByPhone(phone: string): Promise<Customer> {
    return this.customers.find(customer => customer.phone === phone);
  }

  async findByName(name: string): Promise<Customer> {
    return this.customers.find(customer => customer.name === name);
  }

  async findByCustomers(): Promise<Customer[]> {
    return this.customers;
  }

  async findById(): Promise<Customer> {
    return this.customers.find(customer => customer.id);
  }

  async remove(): Promise<void> {
    this.customers.splice(1);
  }
}
