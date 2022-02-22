import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateDeliverymanUseCase } from './UpdateDeliverymanUseCase';

export class UpdateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;
    const { name, username, password, oldPassword } = request.body;

    const updateDeliverymanUseCase = container.resolve(
      UpdateDeliverymanUseCase,
    );

    await updateDeliverymanUseCase.execute({
      id_deliveryman,
      name,
      username,
      password,
      oldPassword,
    });

    return response.status(200).send();
  }
}
