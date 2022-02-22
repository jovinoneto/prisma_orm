import { container } from 'tsyringe';

import { ClientRepository } from '@modules/account/infra/prisma/repositories/ClientRepository';
import { DeliverymanRepository } from '@modules/account/infra/prisma/repositories/DeliverymanRepository';
import { IClientRepository } from '@modules/account/repositories/IClientRepository';
import { IDeliverymanRepository } from '@modules/account/repositories/IDeliverymanRepository';
import { DeliveryRepository } from '@modules/delivery/infra/prisma/repositories/DeliveryRepository';
import { IDeliveryRepository } from '@modules/delivery/repositories/IDeliveryRepository';

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository,
);

container.registerSingleton<IDeliverymanRepository>(
  'DeliverymanRepository',
  DeliverymanRepository,
);

container.registerSingleton<IDeliveryRepository>(
  'DeliveryRepository',
  DeliveryRepository,
);
