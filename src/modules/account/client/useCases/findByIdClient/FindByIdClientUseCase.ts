import { inject, injectable } from 'tsyringe';

import { Client } from '@modules/account/infra/prisma/entities/Client';
import { IClientRepository } from '@modules/account/repositories/IClientRepository';

@injectable()
export class FindByIdClientUseCase {
  constructor(
    @inject('ClientRepository')
    private repositoryClient: IClientRepository,
  ) {}

  async execute(id_client: string): Promise<Client> {
    const client = await this.repositoryClient.findById(id_client);

    if (!client) {
      throw new Error('Client not found');
    }

    return client;
  }
}
