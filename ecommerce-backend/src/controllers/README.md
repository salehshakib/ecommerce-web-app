# Controllers

This directory contains request handlers.

## Structure
- Handle HTTP requests and responses
- Use services for business logic
- Validate request data using middleware

## Example
```typescript
import { Request, Response } from 'express';
import { ExampleService } from '../services/example-service.js';
import { asyncHandler } from '../utils/async-handler.js';

export class ExampleController {
  constructor(private service: ExampleService) {}

  getExample = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.service.processExample(req.params.id);
    res.json({ success: true, data });
  });
}
```
