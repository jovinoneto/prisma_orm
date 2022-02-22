import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

export class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { item_name } = request.body;
    const { id_client } = request;

    const createDeliveryUseCase = container.resolve(CreateDeliveryUseCase);

    await createDeliveryUseCase.execute({ id_client, item_name });

    return response.status(201).send('Sucess');
  }
}
