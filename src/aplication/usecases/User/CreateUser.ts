import { AppError } from '@infra/errors/AppError';
import { IUsersRepository } from 'aplication/repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { User } from 'domain/entities/User';
import { ICreateUser } from 'domain/models/ICreateUser';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUser {
  constructor(
    @inject('UserCore')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUser): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (name === '' || email === '' || password === '') {
      throw new AppError('name, email or password missin');
    }

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}
