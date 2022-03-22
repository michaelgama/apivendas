import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { DeleteCustomer } from '../../../src/aplication/usecases';
import { CustomerRepositoryInMemory } from '../../in-memory/CustomerRepositoryInMemory';

let deleteCustomer: DeleteCustomer;
let customerRepositoryInMemory: CustomerRepositoryInMemory;

describe('Delete Customer', () => {
  beforeEach(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    deleteCustomer = new DeleteCustomer(customerRepositoryInMemory);
  });

  it('Should be able to delete a customer', async () => {
    await customerRepositoryInMemory.create({
      id: 'id',
      name: 'customer_name',
      email: 'customer_mail@mail.com',
      phone: '123456789',
    });

    const customer = await deleteCustomer.execute({
      id: 'id',
    });

    expect(customer).toBe(customer);
  });

  it('should not be able to delete a customer nonexist', async () => {
    await expect(
      deleteCustomer.execute({
        id: 'id',
      }),
    ).rejects.toEqual(new AppError('Customer doesn`t exist'));
  });
});
