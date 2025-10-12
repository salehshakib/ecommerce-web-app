// import { type NextFunction, type Request, type Response } from 'express';
// import { ZodError } from 'zod';

// import { ValidationError } from '@/utils/api-error.js';

// import type { ZodSchema } from 'zod';

// export const validate = (schema: ZodSchema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // Try to parse as structured schema first (with body/params/query)
//       const testData = {
//         body: req.body,
//         params: req.params,
//         query: req.query,
//       };

//       // Check if schema expects structured format by attempting safeParse
//       const structuredResult = schema.safeParse(testData);

//       if (structuredResult.success) {
//         // Structured schema validation succeeded
//         next();
//       } else {
//         // Check if the error is because of missing body/params/query structure
//         // If so, try parsing just the body (legacy support)
//         const hasStructureError = structuredResult.error.issues.some(
//           (issue) =>
//             issue.path.length === 0 ||
//             (issue.path.length === 1 &&
//               ['body', 'params', 'query'].includes(issue.path[0] as string)),
//         );

//         if (!hasStructureError) {
//           // It's a structured schema but validation failed
//           throw structuredResult.error;
//         }

//         // Try simple body-only validation (legacy support)
//         schema.parse(req.body);
//         next();
//       }
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errors = error.issues.map((err) => ({
//           field: err.path.join('.'),
//           message: err.message,
//         }));
//         throw new ValidationError(errors);
//       }
//       next(error);
//     }
//   };
// };

import { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';

import { ValidationError } from '@/utils/api-error';

import type { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const structured = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (!structured.success) {
        const fallback = schema.safeParse(req.body);
        if (!fallback.success) throw fallback.error;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        }));
        return next(new ValidationError(errors));
      }
      next(err);
    }
  };
};
