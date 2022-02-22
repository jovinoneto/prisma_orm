import { inject, injectable } from 'tsyringe';

import { IDeliveryRepository } from '@modules/delivery/repositories/IDeliveryRepository';

import { ICreateDeliveryDTO } from './ICreateDeliveryDTO';

@injectable()
export class CreateDeliveryUseCase {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({ id_client, item_name }: ICreateDeliveryDTO): Promise<void> {
    await this.deliveryRepository.create({ id_client, item_name });
  }
}
