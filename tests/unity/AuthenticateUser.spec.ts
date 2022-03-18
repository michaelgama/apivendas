import 'reflect-metadata';
import { ICreateUser } from '@domain/models/ICreateUser';
import { AppError } from '@infra/errors/AppError';

import { AuthenticateUser } from '../../src/aplication/usecases/User/AuthenticateUser';
import { CreateUser } from '../../src/aplication/usecases/User/CreateUser';
import { UsersRepositoryInMemory } from '../in-memory/UsersRepositoryInMemory';

let authenticateUser: AuthenticateUser;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUser: CreateUser;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUser = new AuthenticateUser(usersRepositoryInMemory);
    createUser = new CreateUser(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUser = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: '1234',
    };
    await createUser.execute(user);

    const result = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    const user: ICreateUser = {
      name: 'any_name',
      email: 'any_mail@email.com',
      password: '1234',
    };

    await createUser.execute(user);

    await expect(
      authenticateUser.execute({
        email: 'false_mail@email.com',
        password: user.password,
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUser = {
      name: 'any_name',
      email: 'any_mail@email.com',
      password: '1234',
    };

    await createUser.execute(user);

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: '4321',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
