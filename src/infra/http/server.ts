import 'reflect-metadata';
import 'express-async-errors';

import 'infra/container';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from 'infra/errors/AppError';
import { router } from 'infra/http/routes';
import createConnection from 'infra/typeorm';

createConnection();
const app = express();

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

app.listen(3333, () => console.log('Server is running!'));
