import { z } from 'zod';

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

// Register validation schema
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'First name must be at most 50 characters')
      .trim()
      .openapi({ example: 'John' }),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Last name must be at most 50 characters')
      .trim()
      .openapi({ example: 'Doe' }),
    email: z
      .string()
      .email('Invalid email address')
      .max(254, 'Email must be at most 254 characters')
      .openapi({ example: 'john.doe@example.com' }),
    phone: z
      .string()
      .max(20, 'Phone number must be at most 20 characters')
      .optional()
      .transform((val) => (val === '' ? undefined : val))
      .openapi({ example: '+1234567890' }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .openapi({ example: 'Password123' }),
    profileImage: z
      .string()
      .url('Profile image must be a valid URL')
      .optional()
      .transform((val) => (val === '' ? undefined : val))
      .openapi({ example: 'https://example.com/avatar.jpg' }),
  })
  .openapi('RegisterRequest');

// Login validation schema
export const loginSchema = z
  .object({
    identifier: z
      .string()
      .min(1, 'Email or phone number is required')
      .trim()
      .openapi({ example: 'john.doe@example.com' }),
    password: z.string().min(1, 'Password is required').openapi({ example: 'Password123' }),
  })
  .openapi('LoginRequest');
