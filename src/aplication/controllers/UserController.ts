import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUser } from '../usecases/CreateUser';

export class UserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUser);

    await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).send();
  }
}
