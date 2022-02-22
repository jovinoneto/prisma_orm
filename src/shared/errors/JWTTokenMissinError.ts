import { AppError } from './AppError';

export class JWTTokenMissinError extends AppError {
  constructor() {
    super('JWT token is missing!', 401);
  }
}
