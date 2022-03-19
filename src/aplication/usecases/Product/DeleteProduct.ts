import { AppError } from '@infra/errors/AppError';
import { IProductsRepository } from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteProduct {
  constructor(
    @inject('ProductCore')
    private productRepository: IProductsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product doesn`t exist');
    }

    await this.productRepository.remove(product);
  }
}
