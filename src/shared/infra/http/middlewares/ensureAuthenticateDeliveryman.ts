import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { JWTInvalidTokenError } from '@shared/errors/JWTInvalidTokenError';
import { JWTTokenMissinError } from '@shared/errors/JWTTokenMissinError';

import auth from '@config/auth';

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTTokenMissinError();
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, auth.secretTokenDeliveryman) as IPayLoad;

    request.id_deliveryman = sub;

    next();
  } catch {
    throw new JWTInvalidTokenError();
  }
}
