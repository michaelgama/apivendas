import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { container } from 'tsyringe';

import { ProductCore } from '../../core/ProductCore';
import { UserCore } from '../../core/UserCore';

container.registerSingleton<IUsersRepository>('UserCore', UserCore);
container.registerSingleton<IProductsRepository>('ProductCore', ProductCore);
