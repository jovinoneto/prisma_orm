import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';

import { CreateDeliverymanError } from './CreateDeliverymanError';
import { ICreateDeliverymanDTO } from './ICreateDeliverymanDTO';

@injectable()
export class CreateDeliverymanUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
  ) {}

  async execute({
    name,
    username,
    password,
  }: ICreateDeliverymanDTO): Promise<void> {
    const deliveryman = await this.deliverymanRepository.exists(username);

    if (deliveryman) {
      throw new CreateDeliverymanError();
    }

    const passwordHash = await hash(password, 8);

    await this.deliverymanRepository.create({
      name,
      username,
      password: passwordHash,
    });
  }
}
