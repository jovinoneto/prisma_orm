import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IClientRepository } from '@modules/account/repositories/IClientRepository';

import auth from '@config/auth';

import { IncorrectEmailOrPasswordError } from '../../../errors/IncorrectEmailOrPasswordError';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  client: {
    name: string;
    username: string;
  };
  token: string;
}

@injectable()
export class AuthenticateClientUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const client = await this.clientRepository.exists(username);

    if (!client) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    const { expiresInToken, secretTokenClient } = auth;

    const token = sign({}, secretTokenClient, {
      subject: client.id,
      expiresIn: expiresInToken,
    });

    const tokenReturn: IResponse = {
      client: {
        name: client.name,
        username: client.username,
      },
      token,
    };

    return tokenReturn;
  }
}
