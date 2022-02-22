import { Router } from 'express';

import { AddDeliverymanController } from '@modules/delivery/useCases/addDeliveryman/AddDeliverymanController';
import { AddEndDateController } from '@modules/delivery/useCases/addEndDate/AddEndDateController';
import { CreateDeliveryController } from '@modules/delivery/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from '@modules/delivery/useCases/findAllAvailable/FindAllAvailableController';
import { FindStartEndDateController } from '@modules/delivery/useCases/findStartEndDate/FindStartEndDateController';

import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from '../middlewares/ensureAuthenticateDeliveryman';

export const deliverytRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const addDeliverymanController = new AddDeliverymanController();
const addEndDateController = new AddEndDateController();
const findAllAvailabController = new FindAllAvailableController();
const findStartEndDateController = new FindStartEndDateController();

deliverytRoutes.post(
  '/',
  ensureAuthenticateClient,
  createDeliveryController.handle,
);
deliverytRoutes.put(
  '/addEndDate/:id',
  ensureAuthenticateDeliveryman,
  addEndDateController.handle,
);
deliverytRoutes.put(
  '/addDeliveryman/:id',
  ensureAuthenticateDeliveryman,
  addDeliverymanController.handle,
);

deliverytRoutes.get(
  '/available',
  ensureAuthenticateDeliveryman,
  findAllAvailabController.handle,
);
deliverytRoutes.get('/findDate/', findStartEndDateController.handle);
