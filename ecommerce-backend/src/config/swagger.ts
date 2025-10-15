import { registerAuthSchemas } from '@/swagger/auth.swagger';
import { registerBrandSchemas } from '@/swagger/brand.swagger';
import { registerProfileSchemas } from '@/swagger/profile.swagger';
import { registerSettingsSchemas } from '@/swagger/settings.swagger';
import { registerUserSchemas } from '@/swagger/user.swagger';
import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

const registry = new OpenAPIRegistry();

// Register all domain-specific schemas
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

registerAuthSchemas(registry);
registerProfileSchemas(registry);
registerUserSchemas(registry);
registerBrandSchemas(registry);
registerSettingsSchemas(registry);

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
});
