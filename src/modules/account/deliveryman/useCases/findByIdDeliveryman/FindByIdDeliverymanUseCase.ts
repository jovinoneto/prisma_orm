import { inject, injectable } from 'tsyringe';

import { Deliveryman } from '@modules/account/infra/prisma/entities/Deliveryman';
import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';

@injectable()
export class FindByIdDeliverymanUseCase {
  constructor(
    @inject('DeliverymanRepository')
    private deliverymanRepository: IDeliverymanRepository,
  ) {}

  async execute(id_deliveryman: string): Promise<Deliveryman> {
    const deliveryman = await this.deliverymanRepository.findById(
      id_deliveryman,
    );

    return deliveryman;
  }
}
