import { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';

import { ValidationError } from '@/utils/api-error.js';

import type { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new ValidationError(errors);
      }
      next(error);
    }
  };
};
