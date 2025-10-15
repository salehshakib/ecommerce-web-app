import z from 'zod';

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const categorySchema = z
  .object({
    name: z
      .string()
      .min(1, 'Category name is required')
      .max(100, 'Category name must be at most 100 characters')
      .trim()
      .openapi({ example: 'Electronics' }),
    description: z
      .string()
      .max(500, 'Description must be at most 500 characters')
      .optional()
      .transform((val) => (val === '' ? undefined : val))
      .openapi({ example: 'All electronic devices and accessories' }),
    isActive: z.boolean().default(true).openapi({ example: true }),
  })
  .openapi('CategoryRequest');

export const categoryUpdateSchema = categorySchema.partial().openapi('CategoryUpdateRequest');
