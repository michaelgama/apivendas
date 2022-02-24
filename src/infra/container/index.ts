import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { UserCore } from 'core/UserCore';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>('UserCore', UserCore);
