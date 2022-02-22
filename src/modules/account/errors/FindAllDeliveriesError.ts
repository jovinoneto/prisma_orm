import { AppError } from '@shared/errors/AppError';

export class FindAllDeliveriesError extends AppError {
  constructor() {
    super("there aren't deliveries");
  }
}
