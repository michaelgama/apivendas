import { Router } from 'express';

import { UserController } from '../../../aplication/controllers/UserController';

export const usersRoutes = Router();

const userController = new UserController();

usersRoutes.post('/', userController.handle);
