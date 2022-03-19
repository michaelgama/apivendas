import { Product } from '@domain/entities/Product';
import { IProductsRepository } from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProducts {
  constructor(
    @inject('ProductCore')
    private productRepository: IProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const produts = await this.productRepository.findByProducts();

    return produts;
  }
}
