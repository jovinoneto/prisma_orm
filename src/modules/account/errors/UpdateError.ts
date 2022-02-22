import { AppError } from '@shared/errors/AppError';

export namespace UpdateError {
  export class UsernameInvalid extends AppError {
    constructor() {
      super('Username invalid');
    }
  }

  export class UsernameAlreadyExists extends AppError {
    constructor() {
      super('Username already exists');
    }
  }

  export class NameInvalid extends AppError {
    constructor() {
      super('Four character minimum expected in name');
    }
  }

  export class OldPasswordNotFound extends AppError {
    constructor() {
      super('Not found old password');
    }
  }

  export class OldPasswordInvalid extends AppError {
    constructor() {
      super("doesn't match old password");
    }
  }

  export class PasswordInvalid extends AppError {
    constructor() {
      super('Four character minimum expected in password');
    }
  }
}
