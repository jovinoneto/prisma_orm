import { AppError } from '@shared/errors/AppError';

export namespace AddEndDateError {
  export class DeliveryNotFound extends AppError {
    constructor() {
      super('Delivery not found!');
    }
  }

  export class DeliverymanNotFound extends AppError {
    constructor() {
      super('Deliveryman not found!');
    }
  }
}
