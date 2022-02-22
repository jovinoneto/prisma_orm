import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddDeliverymanUseCase } from './AddDeliverymanUseCase';

export class AddDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const addDeliverymanUseCase = container.resolve(AddDeliverymanUseCase);

    const result = await addDeliverymanUseCase.execute({
      id_deliveryman,
      id_delivery,
    });

    return response.status(200).json(result);
  }
}
