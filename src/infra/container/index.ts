import { ICustomerRepository } from 'aplication/repositories/ICustomerRepository';
import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { container } from 'tsyringe';

import { CustomerCore } from '../../core/CustomerCore';
import { ProductCore } from '../../core/ProductCore';
import { UserCore } from '../../core/UserCore';

container.registerSingleton<IUsersRepository>('UserCore', UserCore);
container.registerSingleton<IProductsRepository>('ProductCore', ProductCore);
container.registerSingleton<ICustomerRepository>('CustomerCore', CustomerCore);
