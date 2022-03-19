import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { ShowCustomer } from '../../../src/aplication/usecases/Customer/ShowCustomer';
import { CustomerRepositoryInMemory } from '../../in-memory/CustomerRepositoryInMemory';

let showCustomer: ShowCustomer;
let customerRepositoryInMemory: CustomerRepositoryInMemory;

describe('Show Customers', () => {
  beforeEach(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    showCustomer = new ShowCustomer(customerRepositoryInMemory);
  });

  it('should be able to show customer', async () => {
    const customer = await customerRepositoryInMemory.create({
      name: 'customer_name',
      email: 'customer@mail.com',
      phone: '123456789',
    });

    const customers = await showCustomer.execute({
      name: 'customer_name',
    });

    expect(customers).toEqual([customer]);
  });

  it('should not be able to fetch a non-existent customer', async () => {
    await customerRepositoryInMemory.create({
      name: 'customer_name',
      email: 'customer@mail.com',
      phone: '123456789',
    });

    await expect(
      showCustomer.execute({
        name: 'any_customer',
      }),
    ).rejects.toEqual(new AppError('customer does not exist.'));
  });
});
