import { inject, injectable } from 'tsyringe';

import { ClientRepository } from '@modules/account/infra/prisma/repositories/ClientRepository';

@injectable()
export class DeleteClientUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepository,
  ) {}

  async execute(id_client: string): Promise<void> {
    await this.clientRepository.delete(id_client);
  }
}
