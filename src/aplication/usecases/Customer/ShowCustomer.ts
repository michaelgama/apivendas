import { Customer } from '@domain/entities/Customer';
import { AppError } from '@infra/errors/AppError';
import { ICustomerRepository } from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
}

@injectable()
export class ShowCustomer {
  constructor(
    @inject('CustomerCore')
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({ name }: IRequest): Promise<Customer[]> {
    const customer = await this.customerRepository.findByName(name);

    if (!customer) {
      throw new AppError('customer does not exist.');
    }

    return [customer];
  }
}
