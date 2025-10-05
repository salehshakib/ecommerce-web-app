# Models

This directory contains Mongoose schema definitions and models.

## Structure
- Define database schemas using Mongoose
- Export models for use in repositories
- Include indexes, virtuals, and methods

## Example
```typescript
import { Schema, model } from 'mongoose';

const exampleSchema = new Schema({
  name: { type: String, required: true },
  // ... other fields
}, { timestamps: true });

export const ExampleModel = model('Example', exampleSchema);
```
