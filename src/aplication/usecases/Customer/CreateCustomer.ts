import { Customer } from '@domain/entities/Customer';
import { AppError } from '@infra/errors/AppError';
import { ICustomerRepository } from 'aplication/repositories';
import { ICreateCustomer } from 'domain/models/ICreateCustomer';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCustomer {
  constructor(
    @inject('CustomerCore')
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({ name, email, phone }: ICreateCustomer): Promise<Customer> {
    const customerEmailExists = await this.customerRepository.findByEmail(
      email,
    );

    const customerPhoneExists = await this.customerRepository.findByPhone(
      phone,
    );

    if (name === '' || email === '' || phone === '') {
      throw new AppError('name, email or phone missin');
    }

    if (customerEmailExists || customerPhoneExists) {
      throw new AppError('Customer already exists');
    }

    const customer = await this.customerRepository.create({
      name,
      email,
      phone,
    });

    return customer;
  }
}
