import { z } from "zod";

export const settingsFormSchema = z.object({
  // Site Branding
  siteBranding: z.object({
    siteName: z.string().min(1, "Site name is required"),
    siteLogo: z.string().optional(),
    siteFavicon: z.string().optional(),
  }),

  // SEO Configuration
  seoConfig: z.object({
    metaTitle: z.string().min(1, "Meta title is required"),
    metaDescription: z.string().min(1, "Meta description is required"),
    metaKeywords: z.array(z.string()),
    openGhaphTitle: z.string().optional(),
    openGraphDescription: z.string().optional(),
    openGraphImage: z.string().optional(),
  }),

  // Banner Configuration
  bannerConfig: z.object({
    bannerImage: z.string().optional(),
    bannerHeaderText: z.string().optional(),
    bannerSubText: z.string().optional(),
  }),

  // Store Location
  storeLocation: z.object({
    storeName: z.string().min(1, "Store name is required"),
    storeAddress: z.string().min(1, "Store address is required"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),

  // Contact Information
  contactInfo: z.object({
    contactNumber: z.string().min(1, "Contact number is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    emailAddress: z.string().email("Valid email is required"),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    linkedin: z.string().optional(),
  }),

  // Newsletter
  newsLetter: z.object({
    newsLetterEmail: z.string().email("Valid newsletter email is required"),
  }),

  // About Us
  aboutUs: z.object({
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    aboutUsImage: z.string().optional(),
  }),

  // Marquee Configuration
  marqueeConfig: z
    .array(z.string())
    .min(1, "At least one marquee text is required"),

  // Upcoming Classes
  upcomingClasses: z
    .array(
      z.object({
        title: z.string().min(1, "Class title is required"),
        image: z.string().url("Valid image URL is required"),
        date: z.string().min(1, "Date is required"),
        time: z.string().min(1, "Time is required"),
      })
    )
    .optional(),

  // Event Page
  event: z
    .object({
      title: z.string().min(1, "Event page title is required"),
      description: z.string().optional(),
      images: z.tuple([
        z.string().url({ message: "Valid image URL is required" }),
        z.string().url({ message: "Valid image URL is required" }),
      ]),
    })
    .optional(),

  // Investor Page
  investor: z
    .object({
      title: z.string().min(1, "Investor page title is required"),
      description: z.string().optional(),
      images: z.tuple([
        z.string().url({ message: "Valid image URL is required" }),
        z.string().url({ message: "Valid image URL is required" }),
      ]),
    })
    .optional(),
});

export type SettingsFormData = z.infer<typeof settingsFormSchema>;
