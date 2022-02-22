import { Router } from 'express';

import { CreateClientController } from '@modules/account/client/useCases/createClient/CreateClientController';
import { DeleteClientController } from '@modules/account/client/useCases/deleteClient/DeleteClientController';
import { FindAllDeliveriesController } from '@modules/account/client/useCases/findAllDeliveriesClient/FindAllDeliveriesController';
import { FindByIdController } from '@modules/account/client/useCases/findByIdClient/FindByIdController';
import { UpdateClientController } from '@modules/account/client/useCases/updateClient/UpdateClientController';

import { ensureAuthenticateClient } from '../middlewares/ensureAuthenticateClient';

export const clientRoutes = Router();

const createClientController = new CreateClientController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findByIdClient = new FindByIdController();

clientRoutes.post('/', createClientController.handle);
clientRoutes.put('/', ensureAuthenticateClient, updateClientController.handle);
clientRoutes.delete(
  '/',
  ensureAuthenticateClient,
  deleteClientController.handle,
);
clientRoutes.get(
  '/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle,
);
clientRoutes.get('/', ensureAuthenticateClient, findByIdClient.handle);
