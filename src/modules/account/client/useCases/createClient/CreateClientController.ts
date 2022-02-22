import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from './CreateClientUseCase';

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, password } = request.body;

    const createClient = container.resolve(CreateClientUseCase);

    const result = await createClient.execute({ name, username, password });

    return response.status(201).json(result);
  }
}
