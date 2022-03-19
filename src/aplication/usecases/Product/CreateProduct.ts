import { Product } from '@domain/entities/Product';
import { AppError } from '@infra/errors/AppError';
import { IProductsRepository } from 'aplication/repositories';
import { ICreateProduct } from 'domain/models/ICreateProduct';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProduct {
  constructor(
    @inject('ProductCore')
    private productRepository: IProductsRepository,
  ) {}

  async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (name === '' || price === null || quantity === null) {
      throw new AppError('name, price or quantity missin');
    }

    if (productAlreadyExists) {
      throw new AppError('Product already exists');
    }

    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}
