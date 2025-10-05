# Routes

This directory contains API route definitions.

## Structure
- Define API endpoints
- Wire controllers to routes
- Apply validation middleware

## Example
```typescript
import { Router } from 'express';
import { ExampleController } from '../controllers/example-controller.js';
import { validate } from '../middlewares/validate.js';
import { exampleSchema } from '../validators/example-validator.js';

const router = Router();
const controller = new ExampleController(/* inject dependencies */);

router.get('/:id', validate(exampleSchema), controller.getExample);

export default router;
```
