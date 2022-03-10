import { Product } from '@domain/entities/Product';
import { ICreateProduct } from '@domain/models/ICreateProduct';
import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { getRepository, Repository } from 'typeorm';

export class ProductCore implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    id,
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.repository.create({
      id,
      name,
      price,
      quantity,
    });

    await this.repository.save(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.repository.findOne({ name });
    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne(id);
    return product;
  }

  async findByProducts(): Promise<Product[]> {
    const products = await this.repository.find();
    return products;
  }

  async remove(id: Product): Promise<void> {
    await this.repository.remove(id);
  }
}
