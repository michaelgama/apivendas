import { ProductController } from '@controllers/ProductController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.post('/', ensureAuthenticated, productController.create);
productsRoutes.get('/showproduct', ensureAuthenticated, productController.show);
productsRoutes.get('/', ensureAuthenticated, productController.list);
productsRoutes.put('/:id', ensureAuthenticated, productController.update);
productsRoutes.delete('/:id', ensureAuthenticated, productController.delete);
