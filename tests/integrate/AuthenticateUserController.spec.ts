import 'reflect-metadata';
import { app } from '@infra/http/app';
import { createConnection } from '@infra/typeorm';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;

describe('Product Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, created_at, updated_at )
        values('${id}', 'admin', 'admin@test.com', '${password}', 'now()', 'now()')
      `,
    );
  });

  it('should be able to authenticate a user', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    expect(responseToken.statusCode).toBe(200);
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'any_name@test.com',
      password: 'admin',
    });

    expect(responseToken.statusCode).toBe(400);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'any_password',
    });

    expect(responseToken.statusCode).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
