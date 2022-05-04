import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '../container';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import createConnection from '../database';
import { AppError } from '../errors/AppError';
import rateLimiter from './middleware/rateLimiter';
import { router } from './routes';

createConnection();
const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use(cors());
app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`,
    });
  },
);

export { app };
