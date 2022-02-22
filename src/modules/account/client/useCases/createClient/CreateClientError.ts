import { AppError } from '@shared/errors/AppError';

export namespace CreateClientError {
  export class ClientAlreadyExists extends AppError {
    constructor() {
      super('Client already exists');
    }
  }
  export class NameInvalid extends AppError {
    constructor() {
      super('Four character minimum expected in name');
    }
  }
  export class EmailInvalid extends AppError {
    constructor() {
      super('Email invalid');
    }
  }
  export class PasswordInvalid extends AppError {
    constructor() {
      super('Four character minimum expected in password');
    }
  }
}
