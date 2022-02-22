import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateClientUseCase } from './UpdateClientUseCase';

export class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;
    const { name, username, password, oldPassword } = request.body;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    const result = await updateClientUseCase.execute({
      id_client,
      name,
      username,
      password,
      oldPassword,
    });

    return response.status(200).json(result);
  }
}
