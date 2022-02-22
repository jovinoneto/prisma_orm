import { inject, injectable } from 'tsyringe';

import { Delivery } from '@modules/delivery/infra/prisma/entities/Delivery';
import { IDeliveryRepository } from '@modules/delivery/repositories/IDeliveryRepository';

import { IAddDeliverymanDTO } from './IAddDeliverymanDTO';

@injectable()
export class AddDeliverymanUseCase {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({
    id_delivery,
    id_deliveryman,
  }: IAddDeliverymanDTO): Promise<Delivery> {
    const deliveryAlready = await this.deliveryRepository.findByIdDelivery(
      id_delivery,
    );

    if (!deliveryAlready) {
      throw new Error('Delivery not found');
    }

    const delivery = await this.deliveryRepository.addDeliveryman({
      id_delivery,
      id_deliveryman,
    });

    return delivery;
  }
}
