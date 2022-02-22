import { AppError } from '@shared/errors/AppError';

export class CreateDeliverymanError extends AppError {
  constructor() {
    super('Deliveryman already exists');
  }
}
