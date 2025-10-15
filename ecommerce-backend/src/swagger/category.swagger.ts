import { commonResponses } from '@/swagger/common-response';
import { securityRequirement } from '@/swagger/security-requirment';

import { categorySchema, categoryUpdateSchema } from '@/validators/category.validator';

import type { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';

const baseRouteConfig = {
  tags: ['Categories'],
};

const categoryRoutes: RouteConfig[] = [
  {
    method: 'get',
    path: '/categories',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Get all categories',
    description: 'Retrieve a list of all categories (both active and inactive)',
    responses: {
      200: commonResponses[200],
    },
  },
  {
    method: 'get',
    path: '/categories/active',
    ...baseRouteConfig,
    summary: 'Get active categories',
    description: 'Retrieve a list of only active categories',
    responses: {
      200: commonResponses[200],
    },
  },
  {
    method: 'get',
    path: '/categories/{id}',
    ...baseRouteConfig,
    summary: 'Get category by ID',
    description: 'Retrieve a specific category by its ID',
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
    path: '/categories',
    ...baseRouteConfig,
    security: securityRequirement,

    summary: 'Create category',
    description: 'Create a new category',
    request: {
      body: {
        content: {
          'application/json': { schema: categorySchema },
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
    path: '/categories/{id}',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Update category',
    description: 'Update an existing category',
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
          'application/json': { schema: categoryUpdateSchema },
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
    path: '/categories/{id}',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Delete category',
    description: 'Delete a category permanently',
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
    method: 'patch',
    path: '/categories/{id}/toggle-status',
    ...baseRouteConfig,
    security: securityRequirement,
    summary: 'Toggle category status',
    description: 'Activate or deactivate a category',
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

export const registerCategorySchemas = (registry: OpenAPIRegistry) => {
  categoryRoutes.forEach((route) => registry.registerPath(route));
};
