import { User } from '@domain/entities/User';
import { ICreateUser } from '@domain/models/ICreateUser';
import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { v4 as uuidV4 } from 'uuid';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuidV4(),
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}
