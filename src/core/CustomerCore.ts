import { Customer } from '@domain/entities/Customer';
import { ICreateCustomer } from '@domain/models/ICreateCustomer';
import { ICustomerRepository } from 'aplication/repositories/ICustomerRepository';
import { getRepository, Repository } from 'typeorm';

export class CustomerCore implements ICustomerRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  async create({ id, name, email, phone }: ICreateCustomer): Promise<Customer> {
    const customer = this.repository.create({
      id,
      name,
      email,
      phone,
    });

    await this.repository.save(customer);

    return customer;
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.repository.findOne({ email });
    return customer;
  }

  async findByPhone(phone: string): Promise<Customer> {
    const customer = await this.repository.findOne({ phone });
    return customer;
  }

  async findByName(name: string): Promise<Customer> {
    const customer = await this.repository.findOne({ name });
    return customer;
  }

  async findByCustomers(): Promise<Customer[]> {
    const customers = await this.repository.find();
    return customers;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.repository.findOne(id);
    return customer;
  }
}
