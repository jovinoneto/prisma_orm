import { compare, hash } from 'bcrypt';
import * as EmailValidator from 'email-validator';
import { inject, injectable } from 'tsyringe';

import { UpdateError } from '@modules/account/errors/UpdateError';
import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';

import { VerifyEmpty } from '@shared/container/providers/VerifiProvider/VerifiProvider';

import { IUpdateDeliverymantDTO } from './IUpdateDeliverymanDTO';

@injectable()
export class UpdateDeliverymanUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
  ) {}

  async execute({
    id_deliveryman,
    name,
    username,
    password,
    oldPassword,
  }: IUpdateDeliverymantDTO): Promise<void> {
    const deliveryman = await this.deliverymanRepository.findById(
      id_deliveryman,
    );

    let passwordHash = password;

    if (username || VerifyEmpty(username, 4)) {
      const deliverymanExists = await this.deliverymanRepository.exists(
        username,
      );

      if (deliverymanExists) {
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
      const passwordMatch = await compare(oldPassword, deliveryman.password);

      if (!passwordMatch) {
        throw new UpdateError.OldPasswordInvalid();
      }

      if (VerifyEmpty(password, 4)) {
        throw new UpdateError.PasswordInvalid();
      }

      passwordHash = await hash(password, 8);
    }

    await this.deliverymanRepository.update({
      id_deliveryman,
      name,
      username,
      password: passwordHash,
    });
  }
}
