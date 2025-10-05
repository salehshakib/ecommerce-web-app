# Validators

This directory contains Zod validation schemas.

## Structure
- Define validation schemas using Zod
- Validate request body, params, and query
- Export schemas for use with validate middleware

## Example
```typescript
import { z } from 'zod';

export const exampleSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectId
  }),
});

export type ExampleInput = z.infer<typeof exampleSchema>;
```
