import { userProfileSchema } from '@/validators/profile.validator';

import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerUserSchemas = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: 'get',
    path: '/user/all',
    tags: ['User'],
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
    path: '/user/{id}',
    tags: ['User'],
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
    path: '/user/{id}',
    tags: ['User'],
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
    path: '/user/{id}',
    tags: ['User'],
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
