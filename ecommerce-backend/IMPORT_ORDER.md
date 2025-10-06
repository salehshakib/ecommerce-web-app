# Import Organization Guidelines

Imports are **automatically organized** when you run `npm run format`. The order is enforced by Prettier with `@ianvs/prettier-plugin-sort-imports`.

## Import Order

### 1. Core Third-party Imports
```typescript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
```

### 2. Other Third-party Modules
```typescript
import somePackage from 'some-package';
```

### 3. Controllers, Services, Repositories
```typescript
import { AuthController } from '@/controllers/auth.controller.js';
import { AuthService } from '@/services/auth.service.js';
import { UserRepository } from '@/repositories/user.repository.js';
```

### 4. Validators
```typescript
import { registerSchema, loginSchema } from '@/validators/auth.validator.js';
```

### 5. Middlewares
```typescript
import { validate } from '@/middlewares/validate.js';
import { errorHandler } from '@/middlewares/error-handler.js';
```

### 6. Utils
```typescript
import { asyncHandler } from '@/utils/async-handler.js';
import { ApiError } from '@/utils/api-error.js';
```

### 7. Types (with `type` keyword)
```typescript
import type { ApiResponse } from '@/types/api-response.js';
import type { UserPublicProfile } from '@/types/user.type.js';
```

### 8. Models and Config
```typescript
import { User } from '@/models/user.model.js';
import { appConfig } from '@/config/index.js';
```

### 9. Relative Imports
```typescript
import { something } from './something.js';
```

## Formatted Example

After running `npm run format`, imports will be automatically organized like this:

```typescript
import { Router } from 'express';

import { AuthController } from '@/controllers/auth.controller.js';
import { AuthService } from '@/services/auth.service.js';
import { UserRepository } from '@/repositories/user.repository.js';

import { registerSchema, loginSchema } from '@/validators/auth.validator.js';

import { validate } from '@/middlewares/validate.js';

const router = Router();
// ...
```

## How it Works

The import order is configured in [.prettierrc](.prettierrc) using:
- **Plugin**: `@ianvs/prettier-plugin-sort-imports`
- **Config**: See `importOrder` array in `.prettierrc`

Simply run `npm run format` and imports will be automatically reorganized!
