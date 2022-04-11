import { Order } from '@domain/entities/Order';
import { AppError } from '@infra/errors/AppError';
import {
  ICustomerRepository,
  IOrderRepository,
  IProductsRepository,
} from 'aplication/repositories';
import { inject, injectable } from 'tsyringe';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
export class CreateOrder {
  constructor(
    @inject('OrderCore')
    private orderRepository: IOrderRepository,
    @inject('CustomerCore')
    private customerRepository: ICustomerRepository,
    @inject('ProductCore')
    private productRepository: IProductsRepository,
  ) {}

  async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Coul not find any customer with the given id.');
    }

    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Coul not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Coul not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
        is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.orderRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productRepository.updateStock(updatedProductQuantity);

    return order;
  }
}
