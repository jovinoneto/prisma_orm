import { Router } from 'express';

import { CreateDeliverymanController } from '@modules/account/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { DeleteDeliverymanController } from '@modules/account/deliveryman/useCases/deleteDeliveryman/DeleteDeliverymanController';
import { FindAllDeliveriesDeliverymanController } from '@modules/account/deliveryman/useCases/findAllDeliveriesDeliveryman/FindAllDeliveriesDeliverymanController';
import { FindByIdDeliverymanController } from '@modules/account/deliveryman/useCases/findByIdDeliveryman/FindByIdDeliverymanController';
import { UpdateDeliverymanController } from '@modules/account/deliveryman/useCases/updateDeliveryman/UpdateDeliverymanController';

import { ensureAuthenticateDeliveryman } from '../middlewares/ensureAuthenticateDeliveryman';

export const deliverymanRoutes = Router();

const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();
const findByIdDeliverymanController = new FindByIdDeliverymanController();
const createDeliverymanController = new CreateDeliverymanController();
const updateDeliverymanController = new UpdateDeliverymanController();
const deleteDeliverymanController = new DeleteDeliverymanController();

deliverymanRoutes.post('/', createDeliverymanController.handle);
deliverymanRoutes.put(
  '/',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle,
);
deliverymanRoutes.delete(
  '/',
  ensureAuthenticateDeliveryman,
  deleteDeliverymanController.handle,
);
deliverymanRoutes.get(
  '/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle,
);
deliverymanRoutes.get(
  '/',
  ensureAuthenticateDeliveryman,
  findByIdDeliverymanController.handle,
);
