import { loginSchema, registerSchema, userProfileSchema } from '@/validators/auth.validator';

import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerAuthSchemas = (registry: OpenAPIRegistry) => {
  // Register schemas
  registry.register('RegisterRequest', registerSchema);
  registry.register('LoginRequest', loginSchema);
  // registry.register('ProfileByIdRequest', profileByIdSchema);

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

  registry.registerPath({
    method: 'get',
    path: '/auth/profile',
    tags: ['Auth'],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'User profile',
      },
      401: {
        description: 'Unauthorized',
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/auth/profile/{id}',
    tags: ['Auth'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path', // tells Swagger it’s a path variable
        required: true,
        schema: { type: 'string' }, // type of the variable
        example: '670f3a982c3b871f9b4e5a7c', // optional example
      },
    ],
    responses: {
      200: {
        description: 'User profile',
      },
      404: {
        description: 'User not found',
      },
    },
  });
  registry.registerPath({
    method: 'patch',
    path: '/auth/profile/update',
    tags: ['Auth'],
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': { schema: userProfileSchema },
        },
      },
    },
    responses: {
      200: {
        description: 'User profile',
      },
      404: {
        description: 'User not found',
      },
    },
  });
  registry.registerPath({
    method: 'patch',
    path: '/auth/profile/update/{id}',
    tags: ['Auth'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path', // tells Swagger it’s a path variable
        required: true,
        schema: { type: 'string' }, // type of the variable
        example: '670f3a982c3b871f9b4e5a7c', // optional example
      },
    ],
    request: {
      body: {
        content: {
          'application/json': { schema: userProfileSchema },
        },
      },
    },
    responses: {
      200: {
        description: 'User profile',
      },
      404: {
        description: 'User not found',
      },
    },
  });
  registry.registerPath({
    method: 'delete',
    path: '/auth/profile/delete',
    tags: ['Auth'],
    security: [{ bearerAuth: [] }],

    responses: {
      200: {
        description: 'User profile',
      },
      404: {
        description: 'User not found',
      },
    },
  });
  registry.registerPath({
    method: 'delete',
    path: '/auth/profile/delete/{id}',
    tags: ['Auth'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path', // tells Swagger it’s a path variable
        required: true,
        schema: { type: 'string' }, // type of the variable
        example: '670f3a982c3b871f9b4e5a7c', // optional example
      },
    ],
    responses: {
      200: {
        description: 'User profile',
      },
      404: {
        description: 'User not found',
      },
    },
  });
};
