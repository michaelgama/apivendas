import { ICustomerRepository } from 'aplication/repositories/ICustomerRepository';
import { IOrderRepository } from 'aplication/repositories/IOrderRepository';
import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { container } from 'tsyringe';

import { CustomerCore } from '../../core/CustomerCore';
import { OrderCore } from '../../core/OrderCore';
import { ProductCore } from '../../core/ProductCore';
import { UserCore } from '../../core/UserCore';

container.registerSingleton<IUsersRepository>('UserCore', UserCore);
container.registerSingleton<IProductsRepository>('ProductCore', ProductCore);
container.registerSingleton<IOrderRepository>('OrderCore', OrderCore);
container.registerSingleton<ICustomerRepository>('CustomerCore', CustomerCore);
