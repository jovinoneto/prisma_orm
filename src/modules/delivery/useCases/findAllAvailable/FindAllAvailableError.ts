import { AppError } from '@shared/errors/AppError';

export class FindAllAvailableDeliveryError extends AppError {
  constructor() {
    super('Deliveries not available!');
  }
}
