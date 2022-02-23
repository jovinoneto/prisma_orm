import { compare, hash } from 'bcrypt';
import * as EmailValidator from 'email-validator';
import { inject, injectable } from 'tsyringe';

import { UpdateError } from '@modules/account/errors/UpdateError';
import { Client } from '@modules/account/infra/prisma/entities/Client';
import { IClientRepository } from '@modules/account/repositories/IClientRepository';

import { VerifyEmpty } from '@shared/container/providers/VerifiProvider';

import { IUpdateClientDTO } from './IUpdateClientDTO';

@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  async execute({
    id_client,
    name,
    username,
    password,
    oldPassword,
  }: IUpdateClientDTO): Promise<Client> {
    const client = await this.clientRepository.findById(id_client);

    let passwordHash = password;

    if (username || VerifyEmpty(username, 4)) {
      const clientExists = await this.clientRepository.exists(username);

      if (clientExists) {
        throw new UpdateError.UsernameAlreadyExists();
      }

      if (!EmailValidator.validate(username)) {
        throw new UpdateError.UsernameInvalid();
      }
    }

    if (VerifyEmpty(name, 4)) {
      throw new UpdateError.NameInvalid();
    }

    if (password || VerifyEmpty(password, 4)) {
      if (!oldPassword) {
        throw new UpdateError.OldPasswordNotFound();
      }
      const passwordMatch = await compare(oldPassword, client.password);

      if (!passwordMatch) {
        throw new UpdateError.OldPasswordInvalid();
      }

      if (VerifyEmpty(password, 4)) {
        throw new UpdateError.PasswordInvalid();
      }

      passwordHash = await hash(password, 8);
    }

    const result = await this.clientRepository.update({
      id_client,
      name,
      username,
      password: passwordHash,
    });

    return result;
  }
}
