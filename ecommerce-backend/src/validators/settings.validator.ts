import { z } from 'zod';

// ---- Sub-schemas ----
export const siteBrandingSchema = z.object({
  siteName: z.string().trim().min(1),
  siteLogo: z.string().trim().url().nullable().optional(),
  siteFavicon: z.string().trim().url().nullable().optional(),
});

export const seoConfigSchema = z.object({
  metaTitle: z.string().trim().min(1),
  metaDescription: z.string().trim().min(1),
  metaKeywords: z.array(z.string().trim()),
  // keep your exact key name "openGhaphTitle"
  openGhaphTitle: z.string().trim().nullable().optional(),
  openGraphDescription: z.string().trim().nullable().optional(),
  openGraphImage: z.string().trim().url().nullable().optional(),
});

export const bannerConfigSchema = z.object({
  bannerImage: z.string().trim().url().nullable().optional(),
  bannerHeaderText: z.string().trim().nullable().optional(),
  bannerSubText: z.string().trim().nullable().optional(),
});

export const marqueeConfigSchema = z.object({
  marqueeText: z.array(z.string().trim()),
});

export const storeLocationSchema = z.object({
  storeName: z.string().trim().min(1),
  storeAddress: z.string().trim().min(1),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

export const contactInfoSchema = z.object({
  contactNumber: z.string().trim().nullable().optional(),
  phoneNumber: z.string().trim().nullable().optional(),
  emailAddress: z.string().trim().email().nullable().optional(),
  facebook: z.string().trim().url().nullable().optional(),
  instagram: z.string().trim().url().nullable().optional(),
  youtube: z.string().trim().url().nullable().optional(),
  tiktok: z.string().trim().url().nullable().optional(),
});

export const newsLetterSchema = z.object({
  newsLetterEmail: z.string().trim().email().nullable().optional(),
});

export const aboutUsSchema = z.object({
  description: z.string().trim().nullable().optional(),
  aboutUsImage: z.string().trim().url().nullable().optional(),
});

// ---- Full create/replace schema (required fields enforced like Mongoose) ----
export const settingsSchema = z.object({
  siteBranding: siteBrandingSchema,
  seoConfig: seoConfigSchema,
  bannerConfig: bannerConfigSchema,
  marqueeConfig: marqueeConfigSchema,
  storeLocation: storeLocationSchema,
  contactInfo: contactInfoSchema,
  newsLetter: newsLetterSchema,
  aboutUs: aboutUsSchema,
});
