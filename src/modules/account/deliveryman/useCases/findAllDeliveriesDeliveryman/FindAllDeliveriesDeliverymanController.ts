import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllDeliveriesDeliverymanUseCase } from './FindAllDeliveriesDeliverymanUseCase';

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;

    const findAllDeliveriesDeliverymanUseCase = container.resolve(
      FindAllDeliveriesDeliverymanUseCase,
    );

    const result = await findAllDeliveriesDeliverymanUseCase.execute(
      id_deliveryman,
    );

    return response.status(200).json(result);
  }
}
