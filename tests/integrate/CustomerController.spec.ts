import 'reflect-metadata';
import { createConnection } from '@infra/database';
import { app } from '@infra/http/app';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;

describe('Customer Controller', () => {
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

  it('should be able to create a new customer', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Customer',
        email: 'customer@mail.com',
        phone: '123456789',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(201);
  });

  it('should not be able to create customer without name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/customers')
      .send({
        name: '',
        email: 'customer@mail.com',
        phone: '123456789',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create customer without email', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Customer',
        email: '',
        phone: '123456789',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create customer without phone', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Customer',
        email: 'customer@mail.com',
        phone: '',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create two products with the same email', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Customer',
        email: 'customer@mail.com',
        phone: '54789543',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create two products with the same phone', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/customers')
      .send({
        name: 'Customer',
        email: 'customer_any@mail.com',
        phone: '123456789',
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should be able to show customer', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/customers')
      .send({
        name: 'Customer',
        email: 'customer_any@mail.com',
        phone: '123456789',
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .get('/customers/showcustomer?name=Customer')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(200);
  });

  it('should not be able to fetch a non-existent customer', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/customers')
      .send({
        name: 'Customer',
        email: 'customer_any@mail.com',
        phone: '123456789',
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .get('/customers/showcustomer?name=any_Customer')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });
});
