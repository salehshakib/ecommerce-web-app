import { commonResponses } from '@/swagger/common-response';
import { securityRequirement } from '@/swagger/security-requirment';

import { userProfileSchema } from '@/validators/profile.validator';

import type { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';

const userIdPathParam = {
  name: 'id',
  in: 'path' as const,
  required: true,
  schema: { type: 'string' as const },
  example: '670f3a982c3b871f9b4e5a7c',
};

const baseRouteConfig = {
  tags: ['User'],
  security: securityRequirement,
};

const userRoutes: RouteConfig[] = [
  {
    method: 'get',
    path: '/user/all',
    ...baseRouteConfig,
    responses: {
      200: commonResponses[200],
      401: commonResponses[401],
    },
  },
  {
    method: 'get',
    path: '/user/{id}',
    ...baseRouteConfig,
    parameters: [userIdPathParam],
    responses: {
      200: commonResponses[200],
      404: commonResponses[404],
    },
  },
  {
    method: 'patch',
    path: '/user/{id}',
    ...baseRouteConfig,
    parameters: [userIdPathParam],
    request: {
      body: {
        content: {
          'application/json': { schema: userProfileSchema },
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
    path: '/user/{id}',
    ...baseRouteConfig,
    parameters: [userIdPathParam],
    responses: {
      200: commonResponses[200],
      404: commonResponses[404],
    },
  },
];

export const registerUserSchemas = (registry: OpenAPIRegistry) => {
  userRoutes.forEach((route) => registry.registerPath(route));
};
