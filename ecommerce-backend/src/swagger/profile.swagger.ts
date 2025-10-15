import { userProfileSchema } from '@/validators/profile.validator';

import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerProfileSchemas = (registry: OpenAPIRegistry) => {
  registry.register('ProfileRequest', userProfileSchema);

  registry.registerPath({
    method: 'get',
    path: '/profile',
    tags: ['Profile'],
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
    method: 'patch',
    path: '/profile',
    tags: ['Profile'],
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
    method: 'delete',
    path: '/profile',
    tags: ['Profile'],
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
};
