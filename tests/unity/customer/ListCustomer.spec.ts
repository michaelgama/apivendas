import 'reflect-metadata';

import { ListCustomer } from '../../../src/aplication/usecases';
import { CustomerRepositoryInMemory } from '../../in-memory/CustomerRepositoryInMemory';

let listCustomer: ListCustomer;
let customerRepositoryInMemory: CustomerRepositoryInMemory;

describe('Show Customers', () => {
  beforeEach(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    listCustomer = new ListCustomer(customerRepositoryInMemory);
  });

  it('should be able to show all customers', async () => {
    const customer = await customerRepositoryInMemory.create({
      name: 'customer_name',
      email: 'customer@mail.com',
      phone: '123456789',
    });

    const customers = await listCustomer.execute();

    expect(customers).toEqual([customer]);
  });
});
