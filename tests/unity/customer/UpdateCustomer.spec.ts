import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { UpdateCustomer } from '../../../src/aplication/usecases';
import { CustomerRepositoryInMemory } from '../../in-memory/CustomerRepositoryInMemory';

let updateCustomer: UpdateCustomer;
let customerRepositoryInMemory: CustomerRepositoryInMemory;

describe('Update Customer', () => {
  beforeEach(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    updateCustomer = new UpdateCustomer(customerRepositoryInMemory);
  });

  it('Should be able to update a customer', async () => {
    await customerRepositoryInMemory.create({
      id: 'id',
      name: 'customer_name',
      email: 'customer_email@mail.com',
      phone: '123456789',
    });

    const customer = await updateCustomer.execute({
      id: 'id',
      name: 'update_customer',
      email: 'customer_email@mail.com',
      phone: '123456789',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to update a customer nonexist', async () => {
    await expect(
      updateCustomer.execute({
        id: 'id',
        name: 'any_customer',
        email: 'customer_email@mail.com',
        phone: '123456789',
      }),
    ).rejects.toEqual(new AppError('Customer doesn`t exist'));
  });
});
