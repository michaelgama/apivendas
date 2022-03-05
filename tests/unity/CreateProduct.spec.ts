import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { CreateProduct } from '../../src/aplication/usecases/CreateProduct';
import { ProductRepositoryInMemory } from '../in-memory/ProductsRepositoryInMemory';

let createProduct: CreateProduct;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('Create Product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    createProduct = new CreateProduct(productRepositoryInMemory);
  });

  it('Should be able to create a new product', async () => {
    const product = await createProduct.execute({
      name: 'product_name',
      price: 20.0,
      quantity: 10,
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create two products with the same name', async () => {
    await createProduct.execute({
      name: 'product_name',
      price: 15.0,
      quantity: 5,
    });

    await expect(
      createProduct.execute({
        name: 'product_name',
        price: 18.0,
        quantity: 3,
      }),
    ).rejects.toEqual(new AppError('Product already exists'));
  });

  it('should not be able to create products without name', async () => {
    await createProduct.execute({
      name: 'product_name',
      price: 15.0,
      quantity: 5,
    });

    await expect(
      createProduct.execute({
        name: '',
        price: 18.0,
        quantity: 3,
      }),
    ).rejects.toEqual(new AppError('name, price or quantity missin'));
  });

  it('should not be able to create products without price', async () => {
    await createProduct.execute({
      name: 'product_name',
      price: 15.0,
      quantity: 5,
    });

    await expect(
      createProduct.execute({
        name: 'product_name',
        price: null,
        quantity: 3,
      }),
    ).rejects.toEqual(new AppError('name, price or quantity missin'));
  });

  it('should not be able to create products without quantity', async () => {
    await createProduct.execute({
      name: 'product_name',
      price: 15.0,
      quantity: 5,
    });

    await expect(
      createProduct.execute({
        name: 'product_name',
        price: 18.0,
        quantity: null,
      }),
    ).rejects.toEqual(new AppError('name, price or quantity missin'));
  });
});
