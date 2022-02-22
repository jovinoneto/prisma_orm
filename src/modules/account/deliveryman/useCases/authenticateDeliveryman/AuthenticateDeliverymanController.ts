import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = container.resolve(
      AuthenticateDeliverymanUseCase,
    );

    const result = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.status(200).json(result);
  }
}
