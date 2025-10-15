import z from 'zod';

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const brandSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Brand name is required')
      .max(100, 'Brand name must be at most 100 characters')
      .trim()
      .openapi({ example: 'Nike' }),
    description: z
      .string()
      .max(500, 'Description must be at most 500 characters')
      .optional()
      .transform((val) => (val === '' ? undefined : val))
      .openapi({ example: 'Just Do It - Athletic apparel and footwear' }),
    image: z
      .string()
      .url('Brand image must be a valid URL')
      .optional()
      .transform((val) => (val === '' ? undefined : val))
      .openapi({ example: 'https://example.com/nike-logo.png' }),
    isActive: z.boolean().default(true).openapi({ example: true }),
  })
  .openapi('BrandRequest');

export const brandUpdateSchema = brandSchema.partial().openapi('BrandUpdateRequest');
