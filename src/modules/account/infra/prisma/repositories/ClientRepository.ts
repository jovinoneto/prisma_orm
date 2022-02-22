import { IClientRepository } from '@modules/account/repositories/IClientRepository';

import { prismaClient } from '@shared/infra/prisma/client';

import { ICreateClientDTO } from '../../../client/useCases/createClient/ICreateClientDTO';
import { IUpdateClientDTO } from '../../../client/useCases/updateClient/IUpdateClientDTO';
import { Client } from '../entities/Client';

export class ClientRepository implements IClientRepository {
  private readonly repository;
  constructor() {
    this.repository = prismaClient.client;
  }
  async findById(id: string): Promise<Client> {
    const client = await this.repository.findUnique({
      where: {
        id,
      },
    });

    return client;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.repository.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return clients;
  }

  async findAllDeliveriesClient(id_client: string): Promise<Client> {
    const deliveries = await this.repository.findUnique({
      where: {
        id: id_client,
      },
      select: {
        delivery: true,
      },
    });

    return deliveries;
  }

  async exists(username: string): Promise<Client> {
    const client = await this.repository.findFirst({
      where: {
        username,
      },
    });

    return client;
  }

  async create({
    name,
    username,
    password,
  }: ICreateClientDTO): Promise<Client> {
    const client = await this.repository.create({
      data: {
        name,
        username,
        password,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return client;
  }

  async update({
    id_client,
    name,
    username,
    password,
  }: IUpdateClientDTO): Promise<Client> {
    const client = await this.repository.update({
      where: {
        id: id_client,
      },
      data: {
        name,
        username,
        password,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return client;
  }

  async delete(id_client: string): Promise<void> {
    await this.repository.delete({
      where: {
        id: id_client,
      },
    });
  }
}
