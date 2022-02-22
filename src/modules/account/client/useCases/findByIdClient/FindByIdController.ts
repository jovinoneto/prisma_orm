import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdClientUseCase } from './FindByIdClientUseCase';

export class FindByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;

    const findByIdUseCase = container.resolve(FindByIdClientUseCase);

    const result = await findByIdUseCase.execute(id_client);

    return response.status(200).json(result);
  }
}
