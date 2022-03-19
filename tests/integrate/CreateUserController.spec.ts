import 'reflect-metadata';
import { createConnection } from '@infra/database';
import { app } from '@infra/http/app';
import request from 'supertest';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'user',
      email: 'useremail@mail.com',
      password: '1234',
    });

    expect(response.statusCode).toBe(201);
  });

  it('should not be able to create a new user with an existing e-mail', async () => {
    const response = await request(app).post('/users').send({
      name: 'user',
      email: 'useremail@mail.com',
      password: '1234',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create users without name', async () => {
    const response = await request(app).post('/users').send({
      name: '',
      email: 'useremail@mail.com',
      password: '1234',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create users without email', async () => {
    const response = await request(app).post('/users').send({
      name: 'user',
      email: '',
      password: '1234',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create users without password', async () => {
    const response = await request(app).post('/users').send({
      name: 'user',
      email: 'useremail@mail.com',
      password: '',
    });

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
