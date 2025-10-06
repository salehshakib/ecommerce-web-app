import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { loginSchema, registerSchema } from '@/validators/auth.validator.js';

export const registerAuthSchemas = (registry: OpenAPIRegistry) => {
  // Register schemas
  registry.register('RegisterRequest', registerSchema);
  registry.register('LoginRequest', loginSchema);

  // Register routes
  registry.registerPath({
    method: 'post',
    path: '/auth/register',
    tags: ['Auth'],
    request: {
      body: {
        content: {
          'application/json': { schema: registerSchema },
        },
      },
    },
    responses: {
      201: {
        description: 'User registered successfully',
      },
      400: {
        description: 'Validation error',
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    request: {
      body: {
        content: {
          'application/json': { schema: loginSchema },
        },
      },
    },
    responses: {
      200: {
        description: 'Login successful',
      },
      401: {
        description: 'Invalid credentials',
      },
    },
  });
};
