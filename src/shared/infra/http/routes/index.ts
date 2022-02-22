import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { clientRoutes } from './client.routers';
import { deliverytRoutes } from './delivery.routes';
import { deliverymanRoutes } from './deliveryman.routes';

export const router = Router();

router.use('/client', clientRoutes);
router.use('/deliveryman', deliverymanRoutes);
router.use('/delivery', deliverytRoutes);
router.use(authenticateRoutes);
