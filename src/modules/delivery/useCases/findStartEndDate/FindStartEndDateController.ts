import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindStartEndDateUseCase } from './FindStartEndDateUseCase';

export class FindStartEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = request.query;

    const findStartEndDateUseCase = container.resolve(FindStartEndDateUseCase);

    const result = await findStartEndDateUseCase.execute({
      startDate: startDate as string,
      endDate: endDate as string,
    });

    return response.status(200).json(result);
  }
}
