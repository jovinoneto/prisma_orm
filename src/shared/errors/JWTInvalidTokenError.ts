import { AppError } from './AppError';

export class JWTInvalidTokenError extends AppError {
  constructor() {
    super('JWT token invalid!', 401);
  }
}
