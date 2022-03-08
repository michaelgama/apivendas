import { Router } from 'express';

import { CreateProductController } from '../../../aplication/controllers/CreateProductController';
import { ShowProductController } from '../../../aplication/controllers/ShowProductController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const productsRoutes = Router();

const createProductController = new CreateProductController();
const showProductController = new ShowProductController();

productsRoutes.post('/', ensureAuthenticated, createProductController.handle);
productsRoutes.get(
  '/showproduct',
  ensureAuthenticated,
  showProductController.handle,
);
