import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllAvailableUseCase } from './FindAllAvailableUseCase';

export class FindAllAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findAllAvailableUseCase = container.resolve(FindAllAvailableUseCase);

    const result = await findAllAvailableUseCase.execute();

    return response.status(200).json(result);
  }
}
