import { AppError } from '@shared/errors/AppError';

export class DeleteDeliverymanError extends AppError {
  constructor() {
    super('Deliveryman not found!');
  }
}
