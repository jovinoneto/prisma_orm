import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';

import auth from '@config/auth';

import { IncorrectEmailOrPasswordError } from '../../../errors/IncorrectEmailOrPasswordError';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  deliveryman: {
    name: string;
    username: string;
  };
  token: string;
}

@injectable()
export class AuthenticateDeliverymanUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
  ) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const deliveryman = await this.deliverymanRepository.exists(username);

    if (!deliveryman) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    const { expiresInToken, secretTokenDeliveryman } = auth;

    const token = sign({}, secretTokenDeliveryman, {
      subject: deliveryman.id,
      expiresIn: expiresInToken,
    });

    const tokenReturn: IResponse = {
      deliveryman: {
        name: deliveryman.name,
        username: deliveryman.username,
      },
      token,
    };

    return tokenReturn;
  }
}
