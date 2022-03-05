import { Router } from 'express';

import { AuthenticateUserController } from '../../../aplication/controllers/AuthenticateUserController';

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
