import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddEndDateUseCase } from './AddEndDateUseCase';

export class AddEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: id_delivery } = request.params;
    const { id_deliveryman } = request;

    const addEndDateUseCase = container.resolve(AddEndDateUseCase);

    const result = await addEndDateUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.status(200).json(result);
  }
}
