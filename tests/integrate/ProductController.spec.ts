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

  it('should be able to create a new product', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/products')
      .send({
        name: 'Product',
        price: 10.0,
        quantity: 3,
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(201);
  });

  it('should be able to show product', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/products')
      .send({
        name: 'Product2',
        price: 10.0,
        quantity: 3,
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .get('/products/showproduct?name=Product2')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(200);
  });

  it('should be able to list product', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/products')
      .send({
        name: 'Product3',
        price: 10.0,
        quantity: 3,
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .get('/products')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(200);
  });

  it('should be able to update product', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const products = {
      name: 'Product7',
      price: 8.0,
      quantity: 5,
    };

    const response = await request(app)
      .post('/products')
      .send(products)
      .set({ Authorization: `Bearer ${token}` });

    const updateProducts = {
      ...products,
      name: 'update_product',
    };

    const resposeUpdateProduct = await request(app)
      .put(`/products/${response.body.id}`)
      .send(updateProducts)
      .set({ Authorization: `Bearer ${token}` });

    expect(resposeUpdateProduct.statusCode).toBe(201);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
