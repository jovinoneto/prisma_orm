import { inject, injectable } from 'tsyringe';

import { Delivery } from '@modules/delivery/infra/prisma/entities/Delivery';
import { IDeliveryRepository } from '@modules/delivery/repositories/IDeliveryRepository';

interface IRequest {
  startDate: string;
  endDate: string;
}

@injectable()
export class FindStartEndDateUseCase {
  constructor(
    @inject('DeliveryRepository')
    private deliveryRepository: IDeliveryRepository,
  ) {}

  async execute({ startDate, endDate }: IRequest): Promise<Delivery[]> {
    if (!startDate || !endDate) {
      throw new Error('Date start or date end not found');
    }

    const deliveries = await this.deliveryRepository.findStartEndDate(
      startDate,
      endDate,
    );

    return deliveries;
  }
}
