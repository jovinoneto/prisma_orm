import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdDeliverymanUseCase } from './FindByIdDeliverymanUseCase';

export class FindByIdDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_deliveryman } = request;

    const findIdByDeliverymanUseCase = container.resolve(
      FindByIdDeliverymanUseCase,
    );

    const result = await findIdByDeliverymanUseCase.execute(id_deliveryman);

    return response.status(200).json(result);
  }
}
