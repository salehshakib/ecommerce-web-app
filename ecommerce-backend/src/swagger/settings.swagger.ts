import { settingsSchema } from '@/validators/settings.validator';

import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerSettingsSchemas = (registry: OpenAPIRegistry) => {
  // ---- Register Schemas ----
  registry.register('SettingsRequest', settingsSchema);

  // ---- Register Routes ----
  registry.registerPath({
    method: 'get',
    path: '/settings',
    tags: ['Settings'],
    summary: 'Get site settings',
    description: 'Retrieve the full site configuration settings.',
    responses: {
      200: {
        description: 'Settings retrieved successfully',
      },
      404: {
        description: 'Settings not found',
      },
    },
  });

  registry.registerPath({
    method: 'patch',
    path: '/settings',
    tags: ['Settings'],
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
      200: {
        description: 'Settings updated successfully',
      },
      400: {
        description: 'Validation error or bad request',
      },
    },
  });
};
