import { UserController } from '@controllers/UserController';
import { Router } from 'express';

export const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post('/', userController.handle);
