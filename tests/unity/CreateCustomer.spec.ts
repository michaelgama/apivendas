import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { CreateCustomer } from '../../src/aplication/usecases/Customer/CreateCustomer';
import { CustomerRepositoryInMemory } from '../in-memory/CustomerRepositoryInMemory';

let createCustomer: CreateCustomer;
let customerRepositoryInMemory: CustomerRepositoryInMemory;

describe('Create Customer', () => {
  beforeEach(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    createCustomer = new CreateCustomer(customerRepositoryInMemory);
  });

  it('Should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'customer_name',
      email: 'customer_mail@email.com',
      phone: '99419144',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create customer without name', async () => {
    await createCustomer.execute({
      name: 'customer_name',
      email: 'customer_mail@email.com',
      phone: '99419144',
    });

    await expect(
      createCustomer.execute({
        name: '',
        email: 'customer_mail@email.com',
        phone: '99419144',
      }),
    ).rejects.toEqual(new AppError('name, email or phone missin'));
  });

  it('should not be able to create customer without email', async () => {
    await createCustomer.execute({
      name: 'customer_name',
      email: 'customer_mail@email.com',
      phone: '99419144',
    });

    await expect(
      createCustomer.execute({
        name: 'customer_name',
        email: '',
        phone: '99419144',
      }),
    ).rejects.toEqual(new AppError('name, email or phone missin'));
  });

  it('should not be able to create customer without phone', async () => {
    await createCustomer.execute({
      name: 'customer_name',
      email: 'customer_mail@email.com',
      phone: '99419144',
    });

    await expect(
      createCustomer.execute({
        name: 'customer_name',
        email: 'customer_mail@email.com',
        phone: '',
      }),
    ).rejects.toEqual(new AppError('name, email or phone missin'));
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'customer_name',
      email: 'customer_mail@email.com',
      phone: '99419144',
    });

    await expect(
      createCustomer.execute({
        name: 'customer_name',
        email: 'customer_mail@email.com',
        phone: '99419144',
      }),
    ).rejects.toEqual(new AppError('Customer already exists'));
  });

  it('should not be able to create two customers with the same phone', async () => {
    await createCustomer.execute({
      name: 'customer_name',
      email: 'customer_mail@email.com',
      phone: '99419144',
    });

    await expect(
      createCustomer.execute({
        name: 'customer_name',
        email: 'customer_phone@email.com',
        phone: '99419144',
      }),
    ).rejects.toEqual(new AppError('Customer already exists'));
  });
});
