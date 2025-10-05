# Repositories

This directory contains data access layer logic.

## Structure
- Handle all database operations
- Interact with Mongoose models
- Provide abstraction over data access

## Example
```typescript
import { ExampleModel } from '../models/example-model.js';

export class ExampleRepository {
  async findById(id: string) {
    return await ExampleModel.findById(id);
  }

  async create(data: any) {
    return await ExampleModel.create(data);
  }
}
```
