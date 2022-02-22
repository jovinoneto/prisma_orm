import { inject, injectable } from 'tsyringe';

import { Deliveryman } from '@modules/account/infra/prisma/entities/Deliveryman';
import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';

@injectable()
export class FindAllDeliveriesDeliverymanUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
  ) {}

  async execute(id_deliveryman: string): Promise<Deliveryman> {
    const deliveries =
      await this.deliverymanRepository.findAllDeliveriesDeliveryman(
        id_deliveryman,
      );

    return deliveries;
  }
}
