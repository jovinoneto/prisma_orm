import { ICreateClientDTO } from '../client/useCases/createClient/ICreateClientDTO';
import { IUpdateClientDTO } from '../client/useCases/updateClient/IUpdateClientDTO';
import { Client } from '../infra/prisma/entities/Client';

export interface IClientRepository {
  findAllDeliveriesClient(id_client: string): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client>;
  exists(username: string): Promise<Client>;
  create(dto: ICreateClientDTO): Promise<Client>;
  update(dto: IUpdateClientDTO): Promise<Client>;
  delete(id_client: string): Promise<void>;
}
