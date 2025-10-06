import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { registerAuthSchemas } from '@/swagger/auth.swagger.js';

// Step 1: Create registry and register schemas
const registry = new OpenAPIRegistry();

// Register all domain-specific schemas
registerAuthSchemas(registry);

// Step 2: Generate OpenAPI document
const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDoc = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description: 'API documentation generated from Zod schemas',
    contact: {
      name: 'API Support',
    },
  },
  servers: [{ url: 'http://localhost:5000/api/v1', description: 'Development Server' }],
  // components: {
  //   AuthResponse: {
  //     type: 'object',
  //     properties: {
  //       success: {
  //         type: 'boolean',
  //         example: true,
  //       },
  //       message: {
  //         type: 'string',
  //         example: 'Login successful',
  //       },
  //       data: {
  //         type: 'object',
  //         properties: {
  //           user: {
  //             $ref: '#/components/schemas/User',
  //           },
  //           token: {
  //             type: 'string',
  //             description: 'JWT authentication token',
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  //       ValidationError: {
  //         type: 'object',
  //         properties: {
  //           success: {
  //             type: 'boolean',
  //             example: false,
  //           },
  //           message: {
  //             type: 'string',
  //             example: 'Validation failed',
  //           },
  //           errors: {
  //             type: 'array',
  //             items: {
  //               type: 'object',
  //               properties: {
  //                 field: {
  //                   type: 'string',
  //                   example: 'email',
  //                 },
  //                 message: {
  //                   type: 'string',
  //                   example: 'Invalid email',
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       Error: {
  //         type: 'object',
  //         properties: {
  //           success: {
  //             type: 'boolean',
  //             example: false,
  //           },
  //           message: {
  //             type: 'string',
  //             example: 'An error occurred',
  //           },
  //           error: {
  //             type: 'string',
  //             example: 'Error details',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   tags: [
  //     {
  //       name: 'Auth',
  //       description: 'Authentication endpoints',
  //     },
  //     {
  //       name: 'Health',
  //       description: 'Health check endpoint',
  //     },
  //   ],
  // },
  // apis: ['./src/routes/*.ts', './dist/routes/*.js'],
});
