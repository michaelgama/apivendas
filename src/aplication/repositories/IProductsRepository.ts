import { Product } from '@domain/entities/Product';
import { IFindProducts } from '@domain/models/IFindProducts';
import { IUpdateStockProduct } from '@domain/models/IUpdateStockProduct';
import { ICreateProduct } from 'domain/models/ICreateProduct';

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;
  findByName(name: string): Promise<Product>;
  findById(id: string): Promise<Product>;
  findByProducts(): Promise<Product[]>;
  remove(id: Product): Promise<void>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
}
