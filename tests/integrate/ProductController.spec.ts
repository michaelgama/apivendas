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

  it('should not be able to create two products with the same name', async () => {
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

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create product without name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/products')
      .send({
        name: '',
        price: 10.0,
        quantity: 3,
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create products without price', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/products')
      .send({
        name: 'Product',
        price: null,
        quantity: 3,
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create products without quantity', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/products')
      .send({
        name: 'Product',
        price: 15.0,
        quantity: null,
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
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

  it('should not be able to fetch a non-existent product', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/products')
      .send({
        name: 'Product_show',
        price: 10.0,
        quantity: 3,
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app)
      .get('/products/showproduct?name=Product_any')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });

  it('should be able to show all products', async () => {
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

    const product = {
      name: 'Product4',
      price: 8.0,
      quantity: 5,
    };

    const response = await request(app)
      .post('/products')
      .send(product)
      .set({ Authorization: `Bearer ${token}` });

    const updateProducts = {
      ...product,
      name: 'update_product',
    };

    const resposeUpdateProduct = await request(app)
      .put(`/products/${response.body.id}`)
      .send(updateProducts)
      .set({ Authorization: `Bearer ${token}` });

    expect(resposeUpdateProduct.statusCode).toBe(201);
  });

  it('should not be able to update a product nonexist', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const product = {
      name: 'any_Product',
      price: 8.0,
      quantity: 5,
    };

    const response = await request(app)
      .post('/products')
      .send(product)
      .set({ Authorization: `Bearer ${token}` });

    await request(app)
      .delete(`/products/${response.body.id}`)
      .set({ Authorization: `Bearer ${token}` });

    const updateProducts = {
      ...product,
      name: 'update_product',
    };

    const resposeUpdateProduct = await request(app)
      .put(`/products/${response.body.id}`)
      .send(updateProducts)
      .set({ Authorization: `Bearer ${token}` });

    expect(resposeUpdateProduct.statusCode).toBe(400);
  });

  it('should be able to delete product', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const product = {
      name: 'Product5',
      price: 8.0,
      quantity: 5,
    };

    const response = await request(app)
      .post('/products')
      .send(product)
      .set({ Authorization: `Bearer ${token}` });

    const resposeDeleteProduct = await request(app)
      .delete(`/products/${response.body.id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(resposeDeleteProduct.statusCode).toBe(204);
  });

  it('should not be able to delete a product nonexist', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@test.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const product = {
      name: 'Product6',
      price: 9.0,
      quantity: 2,
    };

    const response = await request(app)
      .post('/products')
      .send(product)
      .set({ Authorization: `Bearer ${token}` });

    await request(app)
      .delete(`/products/${response.body.id}`)
      .set({ Authorization: `Bearer ${token}` });

    const resposeDeleteProduct = await request(app)
      .delete(`/products/${response.body.id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(resposeDeleteProduct.statusCode).toBe(400);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
