import { inject, injectable } from 'tsyringe';

import { Client } from '@modules/account/infra/prisma/entities/Client';
import { IClientRepository } from '@modules/account/repositories/IClientRepository';

@injectable()
export class FindAllDeliveriesUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  async execute(id_client: string): Promise<Client> {
    const deliveries = await this.clientRepository.findAllDeliveriesClient(
      id_client,
    );

    return deliveries;
  }
}
