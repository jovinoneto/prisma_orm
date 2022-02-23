import { hash } from 'bcrypt';
import * as EmailValidator from 'email-validator';
import { inject, injectable } from 'tsyringe';

import { Client } from '@modules/account/infra/prisma/entities/Client';
import { IClientRepository } from '@modules/account/repositories/IClientRepository';

import { VerifyEmpty } from '@shared/container/providers/VerifiProvider';

import { CreateClientError } from './CreateClientError';
import { ICreateClientDTO } from './ICreateClientDTO';

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  async execute({
    name,
    username,
    password,
  }: ICreateClientDTO): Promise<Client> {
    const clientExist = await this.clientRepository.exists(username);

    if (clientExist) {
      throw new CreateClientError.ClientAlreadyExists();
    }

    if (VerifyEmpty(name, 4)) {
      throw new CreateClientError.NameInvalid();
    }

    if (!EmailValidator.validate(username)) {
      throw new CreateClientError.EmailInvalid();
    }

    if (VerifyEmpty(password, 4)) {
      throw new CreateClientError.PasswordInvalid();
    }

    const passwordHash = await hash(password, 8);

    const client = await this.clientRepository.create({
      name,
      username,
      password: passwordHash,
    });

    return client;
  }
}
