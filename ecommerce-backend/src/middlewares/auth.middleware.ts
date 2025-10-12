import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '@/utils/api-error';

import type { NextFunction, Request, Response } from 'express';

import { jwtConfig } from '@/config/jwt.js';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthorizedError('Missing or invalid authorization header');

  const parts = authHeader.split(' ');
  const token = parts[1];

  if (!token) throw new UnauthorizedError('Token not provided');

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    (req as any).user = decoded;
    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
};
