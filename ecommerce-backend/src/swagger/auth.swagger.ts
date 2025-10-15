import { commonResponses } from '@/swagger/common-response';

import { loginSchema, registerSchema } from '@/validators/auth.validator';

import type { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';

const baseRouteConfig = {
  tags: ['Auth'],
};

const authRoutes: RouteConfig[] = [
  {
    method: 'post',
    path: '/auth/register',
    ...baseRouteConfig,
    request: {
      body: {
        content: {
          'application/json': { schema: registerSchema },
        },
      },
    },
    responses: {
      201: commonResponses[201],
      400: commonResponses[400],
      409: commonResponses[409],
    },
  },
  {
    method: 'post',
    path: '/auth/login',
    ...baseRouteConfig,
    request: {
      body: {
        content: {
          'application/json': { schema: loginSchema },
        },
      },
    },
    responses: {
      200: commonResponses[200],
      400: commonResponses[400],
      401: commonResponses[401],
    },
  },
];

export const registerAuthSchemas = (registry: OpenAPIRegistry) => {
  // Register routes
  authRoutes.forEach((route) => registry.registerPath(route));
};
