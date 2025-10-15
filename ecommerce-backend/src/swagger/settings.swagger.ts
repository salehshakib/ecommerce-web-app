import { commonResponses } from '@/swagger/common-response';
import { securityRequirement } from '@/swagger/security-requirment';

import { settingsSchema } from '@/validators/settings.validator';

import type { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';

const baseRouteConfig = {
  tags: ['Settings'],
};

const settingsRoutes: RouteConfig[] = [
  {
    method: 'get',
    path: '/settings',
    ...baseRouteConfig,
    summary: 'Get site settings',
    description: 'Retrieve the full site configuration settings.',
    responses: {
      200: commonResponses[200],
      404: commonResponses[404],
    },
  },
  {
    method: 'patch',
    path: '/settings',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Update site settings',
    description: 'Update existing settings or create them if they do not exist.',
    request: {
      body: {
        content: {
          'application/json': { schema: settingsSchema },
        },
      },
    },
    responses: {
      200: commonResponses[200],
      400: commonResponses[400],
    },
  },
];

export const registerSettingsSchemas = (registry: OpenAPIRegistry) => {
  settingsRoutes.forEach((route) => registry.registerPath(route));
};
