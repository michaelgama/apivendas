import { Router } from 'express';

import { ProductController } from '../../../aplication/controllers/ProductController';

export const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.post('/', productController.handle);
