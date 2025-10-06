# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E-commerce backend API built with Express, TypeScript, and MongoDB using a layered architecture pattern.

## Development Commands

```bash
# Development with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Production server (requires build first)
npm start

# Type checking (no emit)
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## Architecture

The codebase follows a strict **layered architecture** with dependency injection and **SOLID principles**:

**Request Flow**: Routes → Controllers → Services → Repositories → Models

### SOLID Principles

- **Single Responsibility Principle (SRP)**: Each class/module has one responsibility
  - Controllers handle HTTP requests/responses only
  - Services contain business logic only
  - Repositories handle data access only
  - Models define data structure only

- **Open/Closed Principle (OCP)**: Open for extension, closed for modification
  - Use interfaces and abstract classes for extensibility
  - Add new features without modifying existing code

- **Liskov Substitution Principle (LSP)**: Derived classes must be substitutable for their base classes
  - Ensure proper inheritance hierarchies
  - Follow interface contracts

- **Interface Segregation Principle (ISP)**: Clients shouldn't depend on interfaces they don't use
  - Create specific, focused interfaces
  - Avoid fat interfaces

- **Dependency Inversion Principle (DIP)**: Depend on abstractions, not concretions
  - Use dependency injection
  - Controllers depend on service interfaces
  - Services depend on repository interfaces

### File Naming Convention

**IMPORTANT**: All files must follow the `{name}.{type}.ts` naming pattern:

- **Controllers**: `auth.controller.ts`, `product.controller.ts`
- **Services**: `auth.service.ts`, `product.service.ts`
- **Repositories**: `auth.repository.ts`, `product.repository.ts`
- **Models**: `user.model.ts`, `product.model.ts`
- **Routes**: `auth.routes.ts`, `product.routes.ts`
- **Validators**: `auth.validator.ts`, `product.validator.ts`
- **Middlewares**: `error-handler.middleware.ts`, `auth.middleware.ts`
- **Utils**: `api-error.util.ts`, `async-handler.util.ts`
- **Types**: `api-response.type.ts`, `user.type.ts`

### Layer Responsibilities

- **Models** (`src/models/`): Mongoose schemas and database models with timestamps
  - Each file contains ONE model definition
  - Files: `{entity}.model.ts`

- **Repositories** (`src/repositories/`): Data access layer, all MongoDB operations
  - Each file contains ONE repository class
  - Files: `{entity}.repository.ts`
  - Keep each repository in its own file
  - **IMPORTANT**: Only include COMPLEX queries, not simple pass-through methods
  - Examples of complex queries:
    - Queries with `.select()` to include/exclude fields (e.g., `select('+passwordHash')`)
    - Queries with multiple conditions or aggregations
    - `countDocuments()` for existence checks without loading full documents
    - Custom create/update operations with specific logic
  - **AVOID**: Simple wrappers like `findById()`, `findOne()`, `findByEmail()` - use Model methods directly in services
  - Only create repository methods when there's additional query complexity

- **Services** (`src/services/`): Business logic, uses repositories
  - Each file contains ONE service class
  - Files: `{entity}.service.ts`
  - Keep each service in its own file

- **Controllers** (`src/controllers/`): Request/response handlers, uses services
  - Each file contains ONE controller class
  - Files: `{entity}.controller.ts`
  - Keep each controller in its own file

- **Routes** (`src/routes/`): API endpoint definitions with validation middleware
  - Each file contains routes for ONE resource
  - Files: `{entity}.routes.ts`
  - Keep each route file separate

- **Validators** (`src/validators/`): Zod schemas for request validation
  - Each file contains validators for ONE resource
  - Files: `{entity}.validator.ts`
  - Keep each validator file separate

- **Middlewares** (`src/middlewares/`): Express middlewares (error handling, validation)
  - Each file contains ONE middleware or related middlewares
  - Files: `{name}.middleware.ts`

- **Utils** (`src/utils/`): Shared utilities (ApiError classes, asyncHandler)
  - Each file contains ONE utility or related utilities
  - Files: `{name}.util.ts`

- **Types** (`src/types/`): TypeScript type definitions and interfaces
  - Each file contains types for ONE domain/feature
  - Files: `{domain}.type.ts` (e.g., `user.type.ts`, `auth.type.ts`, `product.type.ts`)
  - **IMPORTANT**: Keep types separate from implementation files
  - Export shared types, interfaces, and type aliases
  - DTOs (Data Transfer Objects) should be defined here

- **Config** (`src/config/`): Configuration files
  - Each file contains ONE configuration concern
  - Files: `index.ts`, `cors.ts`, `jwt.ts`, `database.ts`

### Key Patterns

1. **Error Handling**: Use ApiError classes from `src/utils/api-error.ts` (NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError, ValidationError)

2. **Async Controllers**: Wrap all async controller methods with `asyncHandler` from `src/utils/async-handler.ts`

3. **Validation**: Use Zod schemas in validators with the `validate` middleware. Schema structure:
   ```typescript
   z.object({
     body: z.object({ /* body schema */ }),
     params: z.object({ /* params schema */ }),
     query: z.object({ /* query schema */ })
   })
   ```

4. **Dependency Injection**: Controllers receive services via constructor, services receive repositories via constructor

5. **API Response Format**: Use `ApiResponse<T>` type from `src/types/api-response.ts`:
   ```typescript
   {
     success: boolean;
     message?: string;
     data?: T;
     error?: string;
     errors?: Array<{ field: string; message: string }>;
   }
   ```

## TypeScript Configuration

- ES modules with `.js` extensions in imports (verbatimModuleSyntax)
- Strict mode enabled with additional strictness flags
- Module: `nodenext`, Target: `esnext`
- Output to `dist/` directory
- **Absolute imports** using `@/` alias for `src/` directory

### Import Path Rules

**ALWAYS use absolute paths with `@/` alias** for all imports:

```typescript
// ✅ Correct - Use absolute paths
import { corsConfig } from '@/config/index.js';
import { errorHandler } from '@/middlewares/error-handler.js';
import { ApiError } from '@/utils/api-error.js';
import type { ApiResponse } from '@/types/api-response.js';

// ❌ Wrong - Don't use relative paths
import { corsConfig } from './config/index.js';
import { errorHandler } from '../middlewares/error-handler.js';
import { ApiError } from '../../utils/api-error.js';
```

**Important**:
- All imports from `src/` must use `@/` prefix
- Still include `.js` extension (TypeScript ES modules requirement)
- `@/` maps to `src/` directory

## Environment Variables

Required variables (see `.env.example`):
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `JWT_EXPIRES_IN`: JWT expiration time (default: 7d)
- `CORS_ORIGIN`: Allowed CORS origin (default: http://localhost:3000)

## Adding New Features

When creating a new feature (e.g., "Product"), follow SOLID principles and create separate files:

1. **Types**: `src/types/product.type.ts` - Type definitions, interfaces, DTOs (ONE file)
2. **Model**: `src/models/product.model.ts` - Define Mongoose schema (ONE file)
3. **Repository**: `src/repositories/product.repository.ts` - Data access layer (ONE file)
4. **Service**: `src/services/product.service.ts` - Business logic (ONE file)
5. **Controller**: `src/controllers/product.controller.ts` - Request handlers (ONE file)
6. **Validator**: `src/validators/product.validator.ts` - Zod schemas (ONE file)
7. **Routes**: `src/routes/product.routes.ts` - API endpoints (ONE file)
8. **Register routes** in `src/app.ts`

**Remember**:
- **ALWAYS create types file first** - Define all types, interfaces, and DTOs
- Each file contains ONLY ONE class/responsibility (SRP)
- Keep files in their respective folders
- Follow the `{name}.{type}.ts` naming convention
- Use dependency injection for loose coupling (DIP)
- Import types from `@/types/{domain}.type.js`

## Important Notes

- All imports must use `.js` extension (TypeScript ES modules requirement)
- Error handler catches ApiError, ValidationError, Mongoose errors, and MongoDB duplicate key errors
- The validate middleware expects Zod schemas with body/params/query structure
- Controllers use class-based approach with dependency injection
