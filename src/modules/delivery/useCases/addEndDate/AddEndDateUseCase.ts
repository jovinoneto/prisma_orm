import { inject, injectable } from 'tsyringe';

import { Delivery } from '@modules/delivery/infra/prisma/entities/Delivery';
import { IDeliveryRepository } from '@modules/delivery/repositories/IDeliveryRepository';

import { AddEndDateError } from './AddEndDateError';
import { IAddEndDateDTO } from './IAddEndDateDTO';

@injectable()
export class AddEndDateUseCase {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({
    id_delivery,
    id_deliveryman,
  }: IAddEndDateDTO): Promise<Delivery> {
    const deliveryAlready = await this.deliveryRepository.findByIdDelivery(
      id_delivery,
    );

    if (!deliveryAlready) {
      throw new AddEndDateError.DeliveryNotFound();
    }

    if (!deliveryAlready.id_deliveryman) {
      throw new AddEndDateError.DeliverymanNotFound();
    }
    const delivery = await this.deliveryRepository.addEndDate({
      id_delivery,
      id_deliveryman,
    });

    return delivery;
  }
}
