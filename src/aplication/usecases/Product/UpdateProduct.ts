import { Product } from '@domain/entities/Product';
import { AppError } from '@infra/errors/AppError';
import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
}

@injectable()
export class UpdateProduct {
  constructor(
    @inject('ProductCore')
    private productRepository: IProductsRepository,
  ) {}

  async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product doesn`t exist');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepository.create(product);
    return product;
  }
}
