import { z } from 'zod';

export const brandSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  description: z.string().trim().max(500).nullable().optional(),
  image: z.string().trim().nullable().optional(),
  isActive: z.boolean().optional(),
});
