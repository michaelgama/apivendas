import { Product } from '@domain/entities/Product';
import { ICreateProduct } from 'domain/models/ICreateProduct';

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;
  findByName(name: string): Promise<Product>;
  findById(id: string): Promise<Product>;
  findByProducts(): Promise<Product[]>;
  remove(id: Product): Promise<void>;
}
