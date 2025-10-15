import { commonResponses } from '@/swagger/common-response';
import { securityRequirement } from '@/swagger/security-requirment';

import { brandSchema, brandUpdateSchema } from '@/validators/brand.validator';

import type { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';

const baseRouteConfig = {
  tags: ['Brands'],
};

const brandRoutes: RouteConfig[] = [
  {
    method: 'get',
    path: '/brands',
    ...baseRouteConfig,
    summary: 'Get all brands',
    description: 'Retrieve a list of all brands (both active and inactive)',
    responses: {
      200: commonResponses[200],
    },
  },
  {
    method: 'get',
    path: '/brands/active',
    ...baseRouteConfig,
    summary: 'Get active brands',
    description: 'Retrieve a list of only active brands',
    responses: {
      200: commonResponses[200],
    },
  },
  {
    method: 'get',
    path: '/brands/{id}',
    ...baseRouteConfig,
    summary: 'Get brand by ID',
    description: 'Retrieve a specific brand by its ID',
    parameters: [
      {
        name: 'id',
        in: 'path' as const,
        required: true,
        schema: { type: 'string' },
        example: '670f3a982c3b871f9b4e5a7c',
      },
    ],
    responses: {
      200: commonResponses[200],
      404: commonResponses[404],
    },
  },
  {
    method: 'post',
    path: '/brands',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Create brand',
    description: 'Create a new brand',
    request: {
      body: {
        content: {
          'application/json': { schema: brandSchema },
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
    method: 'patch',
    path: '/brands/{id}',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Update brand',
    description: 'Update an existing brand',
    parameters: [
      {
        name: 'id',
        in: 'path' as const,
        required: true,
        schema: { type: 'string' },
        example: '670f3a982c3b871f9b4e5a7c',
      },
    ],
    request: {
      body: {
        content: {
          'application/json': { schema: brandUpdateSchema },
        },
      },
    },
    responses: {
      200: commonResponses[200],
      400: commonResponses[400],
      404: commonResponses[404],
      409: commonResponses[409],
    },
  },
  {
    method: 'delete',
    path: '/brands/{id}',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Delete brand',
    description: 'Delete a brand permanently',
    parameters: [
      {
        name: 'id',
        in: 'path' as const,
        required: true,
        schema: { type: 'string' },
        example: '670f3a982c3b871f9b4e5a7c',
      },
    ],
    responses: {
      204: commonResponses[204],
      404: commonResponses[404],
    },
  },
  {
    method: 'patch',
    path: '/brands/{id}/toggle-status',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Toggle brand status',
    description: 'Activate or deactivate a brand',
    parameters: [
      {
        name: 'id',
        in: 'path' as const,
        required: true,
        schema: { type: 'string' },
        example: '670f3a982c3b871f9b4e5a7c',
      },
    ],
    responses: {
      200: commonResponses[200],
      404: commonResponses[404],
    },
  },
];

export const registerBrandSchemas = (registry: OpenAPIRegistry) => {
  brandRoutes.forEach((route) => registry.registerPath(route));
};
