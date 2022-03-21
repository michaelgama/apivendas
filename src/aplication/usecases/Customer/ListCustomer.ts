import { Customer } from '@domain/entities/Customer';
import { ICustomerRepository } from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListCustomer {
  constructor(
    @inject('CustomerCore')
    private customerRepository: ICustomerRepository,
  ) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customerRepository.findByCustomers();

    return customers;
  }
}
