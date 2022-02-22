import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteClientUseCase } from './DeleteClientUseCase';

export class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_client } = request;

    const deleteClienteUseCase = container.resolve(DeleteClientUseCase);

    await deleteClienteUseCase.execute(id_client);

    return response.status(200).send('Deleted with success');
  }
}
