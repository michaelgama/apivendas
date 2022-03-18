import { Router } from 'express';

import { CustommerController } from '../../../aplication/controllers/CustomerController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const customersRoutes = Router();

const customerController = new CustommerController();

customersRoutes.post('/', ensureAuthenticated, customerController.create);
