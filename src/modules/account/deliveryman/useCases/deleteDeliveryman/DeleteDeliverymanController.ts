import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteDeliverymanUseCase } from './DeleteDeliverymanUseCase';

export class DeleteDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;

    const deleteDeliverymanUseCase = container.resolve(
      DeleteDeliverymanUseCase,
    );

    await deleteDeliverymanUseCase.execute(id_deliveryman);

    return response.status(200).send('Done');
  }
}
