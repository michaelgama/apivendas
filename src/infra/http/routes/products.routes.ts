import { ProductController } from 'aplication/controllers/ProductController';
import { Router } from 'express';

export const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.post('/', productController.handle);
