import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { customersRoutes } from './customers.routes';
import { productsRoutes } from './products.routes';
import { usersRoutes } from './users.routes';

export const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/customers', customersRoutes);
router.use(authenticateRoutes);
