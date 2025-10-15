import { commonResponses } from '@/swagger/common-response';
import { securityRequirement } from '@/swagger/security-requirment';

import { userUpdateSchema } from '@/validators/profile.validator';

import type { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';

const baseRouteConfig = {
  tags: ['Profile'],
  security: securityRequirement,
};

const profileRoutes: RouteConfig[] = [
  {
    method: 'get',
    path: '/profile',
    ...baseRouteConfig,
    responses: {
      200: commonResponses[200],
      401: commonResponses[401],
    },
  },
  {
    method: 'patch',
    path: '/profile',
    ...baseRouteConfig,
    request: {
      body: {
        content: {
          'application/json': { schema: userUpdateSchema },
        },
      },
    },
    responses: {
      200: commonResponses[200],
      404: commonResponses[404],
    },
  },
  {
    method: 'delete',
    path: '/profile',
    ...baseRouteConfig,
    responses: {
      200: commonResponses[200],
      404: commonResponses[404],
    },
  },
];

export const registerProfileSchemas = (registry: OpenAPIRegistry) => {
  profileRoutes.forEach((route) => registry.registerPath(route));
};
