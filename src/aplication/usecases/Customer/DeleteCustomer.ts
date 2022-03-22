import { AppError } from '@infra/errors/AppError';
import { ICustomerRepository } from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteCustomer {
  constructor(
    @inject('CustomerCore')
    private customerRepository: ICustomerRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer doesn`t exist');
    }

    await this.customerRepository.remove(customer);
  }
}
