import { Delivery } from '../infra/prisma/entities/Delivery';
import { IAddDeliverymanDTO } from '../useCases/addDeliveryman/IAddDeliverymanDTO';
import { IAddEndDateDTO } from '../useCases/addEndDate/IAddEndDateDTO';
import { ICreateDeliveryDTO } from '../useCases/createDelivery/ICreateDeliveryDTO';

export interface IDeliveryRepository {
  findAllAvailable(): Promise<Delivery[]>;
  findByIdDelivery(id: string): Promise<Delivery>;
  findStartEndDate(startDate: string, endDate: string): Promise<Delivery[]>;
  create(dto: ICreateDeliveryDTO): Promise<void>;
  addDeliveryman(dto: IAddDeliverymanDTO): Promise<Delivery>;
  addEndDate(dto: IAddEndDateDTO): Promise<Delivery>;
}
