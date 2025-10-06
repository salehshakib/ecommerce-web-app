import { type NextFunction, type Request, type Response } from 'express';

import { NotFoundError } from '@/utils/api-error.js';

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  throw new NotFoundError(`Route ${req.originalUrl} not found`);
};
