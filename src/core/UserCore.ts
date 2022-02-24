import { User } from '@domain/entities/User';
import { ICreateUser } from '@domain/models/ICreateUser';
import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

export class UserCore implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ id, name, email, password }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}
