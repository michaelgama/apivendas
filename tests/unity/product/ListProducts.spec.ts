import 'reflect-metadata';

import { ListProducts } from '../../../src/aplication/usecases/Product/ListProducts';
import { ProductRepositoryInMemory } from '../../in-memory/ProductsRepositoryInMemory';

let listProducts: ListProducts;
let productRepositoryInMemory: ProductRepositoryInMemory;

describe('Show Products', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    listProducts = new ListProducts(productRepositoryInMemory);
  });

  it('should be able to show all products', async () => {
    const product = await productRepositoryInMemory.create({
      name: 'any_product',
      price: 10.0,
      quantity: 3,
    });

    const products = await listProducts.execute();

    expect(products).toEqual([product]);
  });
});
