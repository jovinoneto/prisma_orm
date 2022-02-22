import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase';

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;

    const findAllDeliveriesUseCase = container.resolve(
      FindAllDeliveriesUseCase,
    );

    const result = await findAllDeliveriesUseCase.execute(id_client);

    return response.status(200).json(result);
  }
}
