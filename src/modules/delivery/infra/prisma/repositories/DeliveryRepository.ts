import { IDeliveryRepository } from '@modules/delivery/repositories/IDeliveryRepository';
import { IAddDeliverymanDTO } from '@modules/delivery/useCases/addDeliveryman/IAddDeliverymanDTO';
import { IAddEndDateDTO } from '@modules/delivery/useCases/addEndDate/IAddEndDateDTO';
import { ICreateDeliveryDTO } from '@modules/delivery/useCases/createDelivery/ICreateDeliveryDTO';

import { prismaClient } from '@shared/infra/prisma/client';

import { Delivery } from '../entities/Delivery';

export class DeliveryRepository implements IDeliveryRepository {
  private readonly repository;

  constructor() {
    this.repository = prismaClient.delivery;
  }

  async findByIdDelivery(id: string): Promise<Delivery> {
    const delivery = await this.repository.findUnique({
      where: {
        id,
      },
    });

    return delivery;
  }

  async findAllAvailable(): Promise<Delivery[]> {
    const deliveries = await this.repository.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }

  async findStartEndDate(
    startDate: string,
    endDate: string,
  ): Promise<Delivery[]> {
    const deliveries = await this.repository.findMany({
      where: {
        AND: [
          {
            created_at: {
              gte: new Date(startDate),
            },
          },
          {
            created_at: {
              lte: new Date(endDate),
            },
          },
        ],
      },
    });

    return deliveries;
  }

  async create(dto: ICreateDeliveryDTO): Promise<void> {
    await this.repository.create({
      data: {
        ...dto,
      },
    });
  }

  async addDeliveryman({
    id_delivery,
    id_deliveryman,
  }: IAddDeliverymanDTO): Promise<Delivery> {
    const delivery = await this.repository.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    return delivery;
  }

  async addEndDate({
    id_delivery,
    id_deliveryman,
  }: IAddEndDateDTO): Promise<Delivery> {
    await this.repository.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    const delivery = await this.repository.findUnique({
      where: {
        id: id_delivery,
      },
    });

    return delivery;
  }
}
