import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { UpdateProduct } from '../../../src/aplication/usecases/Product/UpdateProduct';
import { ProductRepositoryInMemory } from '../../in-memory/ProductsRepositoryInMemory';

let updateProduct: UpdateProduct;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('Update Product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    updateProduct = new UpdateProduct(productRepositoryInMemory);
  });

  it('Should be able to update a product', async () => {
    await productRepositoryInMemory.create({
      id: 'id',
      name: 'product_name',
      price: 20.0,
      quantity: 10,
    });

    const product = await updateProduct.execute({
      id: 'id',
      name: 'product_test',
      price: 10,
      quantity: 2,
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to update a product nonexist', async () => {
    await expect(
      updateProduct.execute({
        id: 'id',
        name: 'any_product',
        price: 20.0,
        quantity: 10,
      }),
    ).rejects.toEqual(new AppError('Product doesn`t exist'));
  });
});
