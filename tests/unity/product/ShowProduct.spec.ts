import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { ShowProduct } from '../../../src/aplication/usecases';
import { ProductRepositoryInMemory } from '../../in-memory/ProductsRepositoryInMemory';

let showProduct: ShowProduct;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('Show Products', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    showProduct = new ShowProduct(productRepositoryInMemory);
  });

  it('should be able to show product', async () => {
    const product = await productRepositoryInMemory.create({
      name: 'any_product',
      price: 10.0,
      quantity: 3,
    });

    const products = await showProduct.execute({
      name: 'any_product',
    });

    expect(products).toEqual([product]);
  });

  it('should not be able to fetch a non-existent product', async () => {
    await productRepositoryInMemory.create({
      name: 'test_product',
      price: 10.0,
      quantity: 3,
    });

    await expect(
      showProduct.execute({
        name: 'any_product',
      }),
    ).rejects.toEqual(new AppError('product does not exist.'));
  });
});
