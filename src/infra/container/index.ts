import { IProductsRepository } from 'aplication/repositories/IProductsRepository';
import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { ProductCore } from 'core/ProductCore';
import { UserCore } from 'core/UserCore';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>('UserCore', UserCore);
container.registerSingleton<IProductsRepository>('ProductCore', ProductCore);
