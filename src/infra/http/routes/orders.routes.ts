import { OrderController } from '@controllers/OrderController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const ordersRoutes = Router();

const orderController = new OrderController();

ordersRoutes.post('/', ensureAuthenticated, orderController.create);
ordersRoutes.get('/:id', ensureAuthenticated, orderController.show);
