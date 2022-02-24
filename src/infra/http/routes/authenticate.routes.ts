import { AuthenticateUserController } from 'aplication/controllers/AuthenticateUserController';
import { Router } from 'express';

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
