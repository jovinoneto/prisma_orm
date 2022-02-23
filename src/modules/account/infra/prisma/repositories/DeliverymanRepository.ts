import { ICreateDeliverymanDTO } from '@modules/account/deliveryman/useCases/createDeliveryman/ICreateDeliverymanDTO';
import { IUpdateDeliverymantDTO } from '@modules/account/deliveryman/useCases/updateDeliveryman/IUpdateDeliverymanDTO';
import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';

import { prismaClient } from '@shared/infra/prisma/client';

import { Deliveryman } from '../entities/Deliveryman';

export class DeliverymanRepository implements IDeliverymanRepository {
  private readonly repository;
  constructor() {
    this.repository = prismaClient.deliveryman;
  }

  async findAllDeliveriesDeliveryman(
    id_deliveryman: string,
  ): Promise<Deliveryman> {
    const deliveries = await this.repository.findMany({
      where: {
        id: id_deliveryman,
      },
      select: {
        delivery: true,
      },
    });

    return deliveries;
  }

  async findById(id_deliveryman: string): Promise<Deliveryman> {
    const deliveryman = await this.repository.findUnique({
      where: {
        id: id_deliveryman,
      },
    });

    return deliveryman;
  }

  async exists(username: string): Promise<Deliveryman> {
    const deliveryman = await this.repository.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    return deliveryman;
  }

  async create(dto: ICreateDeliverymanDTO): Promise<void> {
    await this.repository.create({
      data: {
        ...dto,
      },
    });
  }

  async update({
    id_deliveryman,
    name,
    username,
    password,
  }: IUpdateDeliverymantDTO): Promise<Deliveryman> {
    const deliveryman = await this.repository.update({
      where: {
        id: id_deliveryman,
      },
      data: {
        name,
        username,
        password,
      },
    });

    return deliveryman;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: { id },
    });
  }
}
