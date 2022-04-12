import { Product } from '@domain/entities/Product';
import { ICreateProduct } from '@domain/models/ICreateProduct';
import { IFindProducts } from '@domain/models/IFindProducts';
import { IUpdateStockProduct } from '@domain/models/IUpdateStockProduct';
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

  async findById(): Promise<Product> {
    return this.products.find(product => product.id);
  }

  async findByProducts(): Promise<Product[]> {
    return this.products;
  }

  async remove(): Promise<void> {
    this.products.splice(1);
  }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const existProducts = this.products.filter(product =>
      products.includes(product),
    );

    return existProducts;
  }

  async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    const product = new Product();

    Object.assign(product, {
      products,
    });

    this.products.push(product);
  }
}
