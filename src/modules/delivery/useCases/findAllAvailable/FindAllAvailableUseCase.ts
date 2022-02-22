import { inject, injectable } from 'tsyringe';

import { Delivery } from '@modules/delivery/infra/prisma/entities/Delivery';
import { IDeliveryRepository } from '@modules/delivery/repositories/IDeliveryRepository';

import { FindAllAvailableDeliveryError } from './FindAllAvailableError';

@injectable()
export class FindAllAvailableUseCase {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute(): Promise<Delivery[]> {
    const delivery = await this.deliveryRepository.findAllAvailable();

    if (delivery.length <= 0) {
      throw new FindAllAvailableDeliveryError();
    }

    return delivery;
  }
}
