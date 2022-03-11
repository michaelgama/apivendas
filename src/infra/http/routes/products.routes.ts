import { Router } from 'express';

import { ProductController } from '../../../aplication/controllers/ProductController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const productsRoutes = Router();

const productController = new ProductController();

productsRoutes.post('/', ensureAuthenticated, productController.create);
productsRoutes.get('/showproduct', ensureAuthenticated, productController.show);
productsRoutes.get('/', ensureAuthenticated, productController.list);
productsRoutes.put('/:id', ensureAuthenticated, productController.update);
productsRoutes.delete('/:id', ensureAuthenticated, productController.delete);
