import { Customer } from '@domain/entities/Customer';
import { AppError } from '@infra/errors/AppError';
import { ICustomerRepository } from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

@injectable()
export class UpdateCustomer {
  constructor(
    @inject('CustomerCore')
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({ id, name, email, phone }: IRequest): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer doesn`t exist');
    }

    customer.name = name;
    customer.email = email;
    customer.phone = phone;

    await this.customerRepository.create(customer);
    return customer;
  }
}
