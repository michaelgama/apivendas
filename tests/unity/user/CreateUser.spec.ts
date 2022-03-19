import 'reflect-metadata';
import { AppError } from '@infra/errors/AppError';

import { CreateUser } from '../../../src/aplication/usecases/User/CreateUser';
import { UsersRepositoryInMemory } from '../../in-memory/UsersRepositoryInMemory';

let createUser: CreateUser;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUser = new CreateUser(usersRepositoryInMemory);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      createUser.execute({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      }),
    ).rejects.toEqual(new AppError('User already exists'));
  });

  it('should not be able to create users without name', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      createUser.execute({
        name: '',
        email: 'any_email@mail.com',
        password: 'any_password',
      }),
    ).rejects.toEqual(new AppError('name, email or password missin'));
  });

  it('should not be able to create users without email', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      createUser.execute({
        name: 'any_name',
        email: '',
        password: 'any_password',
      }),
    ).rejects.toEqual(new AppError('name, email or password missin'));
  });

  it('should not be able to create users without password', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      createUser.execute({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: '',
      }),
    ).rejects.toEqual(new AppError('name, email or password missin'));
  });
});
