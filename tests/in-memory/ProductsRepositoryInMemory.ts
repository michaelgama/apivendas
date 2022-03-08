import { Product } from '@domain/entities/Product';
import { ICreateProduct } from '@domain/models/ICreateProduct';
import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { v4 as uuidV4 } from 'uuid';

export class ProductRepositoryInMemory implements IProductsRepository {
  products: Product[] = [];

  async create({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuidV4(),
      name,
      price,
      quantity,
    });

    this.products.push(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    return this.products.find(product => product.name === name);
  }

  async findById(id: string): Promise<Product> {
    return this.products.find(product => product.id === id);
  }

  async findByProducts(): Promise<Product[]> {
    return this.products;
  }
}
