import { CustommerController } from '@controllers/CustomerController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const customersRoutes = Router();

const customerController = new CustommerController();

customersRoutes.post('/', ensureAuthenticated, customerController.create);
customersRoutes.get(
  '/showcustomer',
  ensureAuthenticated,
  customerController.show,
);
customersRoutes.get('/', ensureAuthenticated, customerController.list);
