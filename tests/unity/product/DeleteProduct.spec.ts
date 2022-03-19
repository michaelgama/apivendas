import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { DeleteProduct } from '../../../src/aplication/usecases/Product/DeleteProduct';
import { ProductRepositoryInMemory } from '../../in-memory/ProductsRepositoryInMemory';

let deleteProduct: DeleteProduct;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('Delete Product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    deleteProduct = new DeleteProduct(productRepositoryInMemory);
  });

  it('Should be able to delete a product', async () => {
    await productRepositoryInMemory.create({
      id: 'id',
      name: 'product_name',
      price: 20.0,
      quantity: 10,
    });

    const product = await deleteProduct.execute({
      id: 'id',
    });

    expect(product).toBe(product);
  });

  it('should not be able to delete a product nonexist', async () => {
    await expect(
      deleteProduct.execute({
        id: 'id',
      }),
    ).rejects.toEqual(new AppError('Product doesn`t exist'));
  });
});
