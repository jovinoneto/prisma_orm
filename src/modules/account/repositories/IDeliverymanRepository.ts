import { ICreateDeliverymanDTO } from '../deliveryman/useCases/createDeliveryman/ICreateDeliverymanDTO';
import { IUpdateDeliverymantDTO } from '../deliveryman/useCases/updateDeliveryman/IUpdateDeliverymanDTO';
import { Deliveryman } from '../infra/prisma/entities/Deliveryman';

export interface IDeliverymanRepository {
  findAllDeliveriesDeliveryman(idDeliveryman: string): Promise<Deliveryman>;
  findById(idDeliveryman: string): Promise<Deliveryman>;
  exists(username: string): Promise<Deliveryman>;
  create(dto: ICreateDeliverymanDTO): Promise<void>;
  update(dto: IUpdateDeliverymantDTO): Promise<Deliveryman>;
  delete(id: string): Promise<void>;
}
