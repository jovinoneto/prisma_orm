import { Router } from 'express';

import { AuthenticateClientController } from '@modules/account/client/useCases/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from '@modules/account/deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';

export const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

authenticateRoutes.post(
  '/sessions/client',
  authenticateClientController.handle,
);
authenticateRoutes.post(
  '/sessions/deliveryman',
  authenticateDeliverymanController.handle,
);
