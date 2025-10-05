# Services

This directory contains business logic layer.

## Structure
- Implement business logic
- Use repositories for data access
- Handle complex operations and transformations

## Example
```typescript
import { ExampleRepository } from '../repositories/example-repository.js';

export class ExampleService {
  constructor(private repository: ExampleRepository) {}

  async processExample(id: string) {
    const data = await this.repository.findById(id);
    // Business logic here
    return data;
  }
}
```
