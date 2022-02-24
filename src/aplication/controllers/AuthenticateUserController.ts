import { AuthenticateUser } from 'aplication/usecases/AuthenticateUser';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUser = container.resolve(AuthenticateUser);

    const token = await authenticateUser.execute({
      password,
      email,
    });
    return response.json(token);
  }
}
