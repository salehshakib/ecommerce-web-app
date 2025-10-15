import { z } from 'zod';

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

// ---- Sub-schemas ----
export const siteBrandingSchema = z.object({
  siteName: z.string().trim().min(1).openapi({ example: 'My Awesome Store' }),
  siteLogo: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://example.com/logo.png' }),
  siteFavicon: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://example.com/favicon.ico' }),
});

export const seoConfigSchema = z.object({
  metaTitle: z.string().trim().min(1).openapi({ example: 'Best Online Store - Quality Products' }),
  metaDescription: z
    .string()
    .trim()
    .min(1)
    .openapi({ example: 'Discover amazing products at great prices' }),
  metaKeywords: z
    .array(z.string().trim())
    .openapi({ example: ['shopping', 'products', 'online store'] }),
  openGhaphTitle: z.string().trim().nullable().optional().openapi({ example: 'Best Online Store' }),
  openGraphDescription: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: 'Share our amazing store' }),
  openGraphImage: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://example.com/og-image.jpg' }),
});

export const bannerConfigSchema = z.object({
  bannerImage: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://example.com/banner.jpg' }),
  bannerHeaderText: z.string().trim().nullable().optional().openapi({ example: 'Summer Sale!' }),
  bannerSubText: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: 'Up to 50% off on all items' }),
});

export const marqueeConfigSchema = z.object({
  marqueeText: z
    .array(z.string().trim())
    .openapi({ example: ['Free shipping on orders over $50', 'New arrivals every week!'] }),
});

export const storeLocationSchema = z.object({
  storeName: z.string().trim().min(1).openapi({ example: 'Main Store' }),
  storeAddress: z.string().trim().min(1).openapi({ example: '123 Main St, City, State 12345' }),
  latitude: z.number().nullable().optional().openapi({ example: 40.7128 }),
  longitude: z.number().nullable().optional().openapi({ example: -74.006 }),
});

export const contactInfoSchema = z.object({
  contactNumber: z.string().trim().nullable().optional().openapi({ example: '+1-555-0123' }),
  phoneNumber: z.string().trim().nullable().optional().openapi({ example: '+1-555-0123' }),
  emailAddress: z
    .string()
    .trim()
    .email()
    .nullable()
    .optional()
    .openapi({ example: 'contact@example.com' }),
  facebook: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://facebook.com/ourstore' }),
  instagram: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://instagram.com/ourstore' }),
  youtube: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://youtube.com/ourstore' }),
  tiktok: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://tiktok.com/@ourstore' }),
});

export const newsLetterSchema = z.object({
  newsLetterEmail: z
    .string()
    .trim()
    .email()
    .nullable()
    .optional()
    .openapi({ example: 'newsletter@example.com' }),
});

export const aboutUsSchema = z.object({
  description: z
    .string()
    .trim()
    .nullable()
    .optional()
    .openapi({ example: 'We are a family-owned business since 1990...' }),
  aboutUsImage: z
    .string()
    .trim()
    .url()
    .nullable()
    .optional()
    .openapi({ example: 'https://example.com/about-us.jpg' }),
});

// ---- Full create/replace schema (required fields enforced like Mongoose) ----
export const settingsSchema = z
  .object({
    siteBranding: siteBrandingSchema,
    seoConfig: seoConfigSchema,
    bannerConfig: bannerConfigSchema,
    marqueeConfig: marqueeConfigSchema,
    storeLocation: storeLocationSchema,
    contactInfo: contactInfoSchema,
    newsLetter: newsLetterSchema,
    aboutUs: aboutUsSchema,
  })
  .openapi('SettingsRequest');
