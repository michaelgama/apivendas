import { Product } from '@domain/entities/Product';
import { AppError } from '@infra/errors/AppError';
import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
}

@injectable()
export class ShowProduct {
  constructor(
    @inject('ProductCore')
    private productRepository: IProductsRepository,
  ) {}

  async execute({ name }: IRequest): Promise<Product[]> {
    const produts = await this.productRepository.findByName(name);

    if (!produts) {
      throw new AppError('product does not exist.');
    }

    return [produts];
  }
}
